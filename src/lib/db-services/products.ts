"use server";
import { TProductSearchParams } from "@/app/search/page";
import { db } from "@/drizzle/db";
import {
  cartItems,
  orderItems,
  orders,
  productReviews,
  products,
  productVariantImages,
  productVariants,
  shippingStatus,
  users,
} from "@/drizzle/schema";
import { and, eq, ne, sql } from "drizzle-orm";

type TProduct = typeof products.$inferInsert;

export interface TProductsWithVariantsAndImages {
  productId: string;
  productInternalId: number;
  name: string;
  description: string;
  discount: number;
  onDiscount: boolean;
  createdAt: string;
  updatedAt: string;
  categories: TCategory[];
  productVariants: ProductVariant[];
}

export interface TCategory {
  categoryId: string;
  categoryInternalId: number;
  categoryName: string;
}
export interface ProductVariant {
  productVariantId: string;
  productVariantInternalId: number;
  color: string;
  size: string;
  price: number;
  inventoryCount: number;
  onSale: boolean;
  productVariantImages: string[];
}

export interface TProductVariantData {
  productId: string;
  productInternalId: string;
  name: string;
  description: string;
  discount: number | null;
  onDiscount: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  categoryInternalId: string;
  productVariantId: string;
  color: string;
  size: string;
  inventoryCount: number;
  price: number;
  onSale: boolean;
  productVariantImages: string[];
}

export type TshippingStatus = (typeof shippingStatus.enumValues)[number];

export const getAllProducts = async () => {
  return await db.select().from(products);
};

export const getAllProductsWithSpecificFields = async (filter: any) => {
  return await db.select(filter).from(products);
};

export const findProductByName = async (name: string) => {
  return await db.select().from(products).where(eq(products.name, name));
};

export const findProductById = async (id: string) => {
  return await db.select().from(products).where(eq(products.productId, id));
};

export const insertProduct = async (product: TProduct) => {
  return await db.insert(products).values(product);
};

export const updateProductById = async (id: string, product: TProduct) => {
  return await db
    .update(products)
    .set(product)
    .where(eq(products.productId, id));
};

export const deleteProductById = async (id: string) => {
  return await db.delete(products).where(eq(products.productId, id));
};

export const getProductsWithVariants = async ({
  productId,
  limit,
}: {
  productId?: string;
  limit?: number;
}) => {

  const query = sql`
    WITH
      category_agg AS (
        SELECT
          pc."productId",
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'categoryId', c."categoryId",
              'categoryInternalId', c."categoryInternalId"
            )
          ) AS categories
        FROM
          "productCategories" pc
          JOIN "categories" c ON c."categoryId" = pc."categoryId"
        GROUP BY
          pc."productId"
      ),

      product_variant_agg AS (
        SELECT
          pv."productId",
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'productVariantId', pv."productVariantId",
              'productVariantInternalId', pv."productVariantInternalId",
              'color', pv.color,
              'size', pv.size,
              'price', pv.price,
              'inventoryCount', pv."inventoryCount",
              'onSale', pv."onSale",
              'productVariantImages', pv_agg."productVariantImages"
            )
          ) AS variants
        FROM
          "productVariants" pv
          LEFT JOIN (
            SELECT
              pvi."productVariantId",
              ARRAY_AGG(pvi."imgUrl") AS "productVariantImages"
            FROM
              "productVariantImages" pvi
            GROUP BY
              pvi."productVariantId"
          ) AS pv_agg ON pv_agg."productVariantId" = pv."productVariantId"
        GROUP BY
          pv."productId"
      )

    SELECT
      p."productId",
      p."productInternalId",
      p."name",
      p."description",
      p."discount",
      p."onDiscount",
      p."createdAt",
      p."updatedAt",
      cat.categories,
      pv_agg.variants as "productVariants"
    FROM
      products p
      JOIN category_agg cat ON cat."productId" = p."productId"
      LEFT JOIN product_variant_agg pv_agg ON pv_agg."productId" = p."productId"
    ${productId ? sql`WHERE p."productId" = ${productId}` : sql``}  -- Apply filter if productId is provided
    ORDER BY
      p."createdAt"
    LIMIT ${limit || 1000};
  `;

  // Execute the query and return the result
  const productsData = (await db.execute(
    query,
  )) as unknown as TProductsWithVariantsAndImages[];

  return productsData;
};
//---------------------------------------------------------------------------------------

export interface TProductVariantWithDetails {
  productId: string;
  productInternalId: number;
  name: string;
  description: string;
  discount: number;
  onDiscount: boolean;
  createdAt: string;
  categories: TCategory[];
  productVariantId: string;
  productVariantInternalId: number;
  color: string;
  size: string;
  price: number;
  inventoryCount: number;
  productVariantImages: string[];
}

export const getAllIndividualVariantsWithDetails = async (
  searchParams: Partial<TProductSearchParams>,
) => {
  const searchPattern = searchParams.name ? `%${searchParams.name}%` : "%";
  const genderPattern = searchParams.gender ? `%${searchParams.gender}%` : "%";
  const styles = searchParams.styles?.split(",").filter(Boolean);

  const minPrice = searchParams["min-price"] || 0;
  const maxPrice = searchParams["max-price"] || 99999;

  const pageNumber = Number(searchParams.page) || 1;

  const sortyByPrice =
    searchParams?.sortby === "high-low"
      ? sql`pv_agg.price DESC`
      : searchParams.sortby === "low-high"
        ? sql`pv_agg.price ASC`
        : "";

  const categoryPattern = searchParams.category
    ? `%${searchParams.category}%`
    : "%";

  const sizes = searchParams.sizes?.split(",").filter(Boolean);

  const productVariants = await db.execute(
    sql`
   WITH
    category_agg AS (
      SELECT
        pc."productId",
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'categoryId',
            c."categoryId",
            'categoryInternalId',
            c."categoryInternalId",
            'categoryName',
            c."name"
          )
        ) AS categories
      FROM
        "productCategories" pc
        JOIN "categories" c ON c."categoryId" = pc."categoryId"
      GROUP BY
        pc."productId"
    ),

    product_variant_agg AS (
      SELECT
        pv."productId",
        pv."productVariantId",
        pv."productVariantInternalId",
        pv.color,
        pv.price,
        pv.size,
        pv."inventoryCount",
        pvi_agg."productVariantImages",
        pv."createdAt"
      FROM
        "productVariants" pv
        LEFT JOIN (
          SELECT
            pvi."productVariantId",
            ARRAY_AGG(pvi."imgUrl") AS "productVariantImages"
          FROM
            "productVariantImages" pvi
          GROUP BY
            pvi."productVariantId"
        ) AS pvi_agg ON pvi_agg."productVariantId" = pv."productVariantId"
    )

    SELECT
      p."productId",
      p."productInternalId",
      p."name",
      p."description",
      p."discount",
      p."onDiscount",
      p."createdAt",
      cat.categories,
      pv_agg.*
    FROM
      products p
      JOIN category_agg cat ON cat."productId" = p."productId"
      LEFT JOIN product_variant_agg pv_agg ON pv_agg."productId" = p."productId"
    WHERE
      (p."name" ILIKE ${searchPattern}
      OR p."description" ILIKE ${searchPattern}
      OR EXISTS (
        SELECT 1
        FROM jsonb_array_elements(cat.categories::jsonb) AS category
        WHERE category->>'categoryName' ILIKE ${searchPattern}
      )) AND EXISTS (
        SELECT 1
        FROM jsonb_array_elements(cat.categories::jsonb) AS category
        WHERE category->>'categoryName' LIKE ${genderPattern}
     )
      AND EXISTS (
        SELECT 1
        FROM jsonb_array_elements(cat.categories::jsonb) AS category
        WHERE category->>'categoryName' LIKE ${categoryPattern}
      )
      AND (pv_agg.price >= ${minPrice} AND pv_agg.price <= ${maxPrice})


    ORDER BY
     ${sortyByPrice};`,
  );

  let totalTrueCount = 0;

  let totalCount = 0;

  let skip = (pageNumber - 1) * 20;

  const products = (
    productVariants as unknown as TProductVariantWithDetails[]
  ).filter((val) => {
    // check size of prod included in size filter

    if (sizes && sizes.length > 0) {
      if (!sizes.includes(val.size)) {
        return false;
      }
    }

    if (styles && styles.length > 0) {
      if (!val.categories.some((cat) => styles.includes(cat.categoryName))) {
        return false;
      }
    }

    totalTrueCount++;

    if (totalTrueCount <= skip || totalCount >= 20) return false;

    totalCount++;

    return true;
  });

  return {
    products,
    total: totalTrueCount,
    totalPages: Math.ceil(totalTrueCount / 20),
  };
};

//---------------------------------------------------------------------------------

export interface TProductVariantDetails {
  productVariantId: string;
  productVariantInternalId: number;
  productId: string;
  color: string;
  size: string;
  inventoryCount: number;
  price: number;
  avgRating: number;
  onSale: boolean;
  createdAt: string;
  updatedAt: string;
  productInternalId: number;
  name: string;
  description: string;
  discount: number;
  productVariantImages: string[];
  onDiscount: boolean;
  variants: Variant[];
}

export interface Variant {
  productVariantId: string;
  productVariantInternalId: number;
  color: string;
  size: string;
  inventoryCount: number;
  onSale: boolean;
  avgRating: number;
}

export const getProductVariantDetails = async (variantId: string) => {
  const query = sql`
    SELECT
      *,
      (
        SELECT
          ARRAY_AGG(pvi."imgUrl")
        FROM
          "productVariantImages" pvi
        WHERE
          pvi."productVariantId" = pv."productVariantId"
      ) as "productVariantImages",
      (
        SELECT
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'productVariantId',
              prdVar."productVariantId",
              'productVariantInternalId',
              prdVar."productVariantInternalId",
              'color',
              prdVar.color,
              'size',
              prdVar.size,
              'inventoryCount',
              prdVar."inventoryCount",
              'onSale',
              prdVar."onSale",
              'avgRating',
              prdVar."avgRating"
            )
          )
        FROM
          "productVariants" prdVar
        WHERE
          prdVar."productId" = pv."productId"
      ) as variants
    FROM
      "productVariants" pv
      join products p on p."productId" = pv."productId"
    WHERE
      pv."productVariantId" = ${variantId}

  `;

  const variantDetails = (await db.execute(
    query,
  )) as unknown as TProductVariantDetails[];

  return variantDetails[0];
};

export const getProductVariantReviewInfo = async (productVariantId: string) => {
  return await db
    .select({
      avgRating: productVariants.avgRating,
      ratingsCount: productVariants.ratingsCount,
    })
    .from(productVariants)
    .where(eq(productVariants.productVariantId, productVariantId));
};

export const updateProductVariantAvgReview = async (
  productVariantId: string,
  avgRating: number,
  ratingsCount: number,
) => {
  return await db
    .update(productVariants)
    .set({ avgRating, ratingsCount })
    .where(eq(productVariants.productVariantId, productVariantId));
};

export const findAllReviewByProductVariantId = async (
  productVariantId: string,
) => {
  return await db
    .select({
      productReviewId: productReviews.productReviewId,
      userId: productReviews.userId,
      rating: productReviews.rating,
      review: productReviews.review,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(productReviews)
    .fullJoin(users, eq(users.userId, productReviews.userId))
    .where(eq(productReviews.productVariantId, productVariantId));
};

export const findAllUserCartItems = async (userId: string) => {
  return await db
    .select({
      cartItemId: cartItems.cartItemId,
      userId: cartItems.userId,
      name: products.name,
      description: products.description,
      discount: products.discount,
      onDiscount: products.onDiscount,
      productVariantId: cartItems.productVariantId,
      inventoryCount: productVariants.inventoryCount,
      quantity: cartItems.quantity,
      color: productVariants.color,
      size: productVariants.size,
      price: productVariants.price,
      imgUrls:
        sql`array_agg(${productVariantImages.imgUrl} ORDER BY ${productVariantImages.imgUrl} ASC)`.as(
          "imgUrls",
        ),
    })
    .from(cartItems)
    .leftJoin(
      productVariants,
      eq(cartItems.productVariantId, productVariants.productVariantId),
    )
    .leftJoin(products, eq(products.productId, productVariants.productId))
    .leftJoin(
      productVariantImages,
      eq(
        productVariantImages.productVariantId,
        productVariants.productVariantId,
      ),
    )
    .where(eq(cartItems.userId, userId))
    .groupBy(
      cartItems.cartItemId,
      cartItems.userId,
      products.name,
      products.description,
      products.discount,
      products.onDiscount,
      cartItems.productVariantId,
      cartItems.quantity,
      productVariants.color,
      productVariants.inventoryCount,
      productVariants.size,
      productVariants.price,
    );
};

export const deleteCartItem = async ({
  productVariantId,
  userId,
}: {
  productVariantId: string;
  userId: string;
}) => {
  return await db
    .delete(cartItems)
    .where(
      and(
        eq(cartItems.productVariantId, productVariantId),
        eq(cartItems.userId, userId),
      ),
    );
};

export interface TOrderItem {
  orderItemId: string;
  orderId: string;
  userId: string;
  paymentStatus: string;
  orderDate: string;
  shippingStatus: string;
  name: string;
  total: number;
  price: string;
  quantity: number;
  imgUrls: string[];
}

export const findAllOrderItems = async (userId: string) => {
  return await db
    .select({
      orderId: orders.orderId,
      orderItemId: orderItems.orderItemId,
      total: orderItems.total,
      userId: orders.userId,
      paymentStatus: orderItems.paymentStatus,
      orderDate: orders.createdAt,
      shippingStatus: orderItems.shippingStatus,
      name: products.name,
      quantity: orderItems.quantity,
      imgUrls:
        sql`array_agg(${productVariantImages.imgUrl} ORDER BY ${productVariantImages.imgUrl} ASC)`.as(
          "imgUrls",
        ),
    })
    .from(orderItems)
    .leftJoin(orders, eq(orders.orderId, orderItems.orderId))
    .leftJoin(
      productVariants,
      eq(productVariants.productVariantId, orderItems.productVariantId),
    )
    .leftJoin(products, eq(products.productId, productVariants.productId))
    .leftJoin(
      productVariantImages,
      eq(
        productVariantImages.productVariantId,
        productVariants.productVariantId,
      ),
    )
    .where(
      and(
        eq(orders.userId, userId),
        ne(orderItems.shippingStatus, "CANCELLED"),
      ),
    )
    .groupBy(
      orders.orderId,
      orderItems.orderItemId,
      orderItems.price,
      orders.userId,
      orderItems.paymentStatus,
      orders.createdAt,
      orderItems.shippingStatus,
      products.name,
    );
};

export const updateOrderItemShippingStatus = async ({
  orderItemId,
  shippingStatus,
}: {
  orderItemId: string;
  shippingStatus: TshippingStatus;
}) => {
  await db
    .update(orderItems)
    .set({ shippingStatus })
    .where(eq(orderItems.orderItemId, orderItemId));
};

export const getTopSellingProducts = async () => {
  const productVariants = await db.execute(
    sql`
   WITH
    category_agg AS (
      SELECT
        pc."productId",
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'categoryId',
            c."categoryId",
            'categoryInternalId',
            c."categoryInternalId",
            'categoryName',
            c."name"
          )
        ) AS categories
      FROM
        "productCategories" pc
        JOIN "categories" c ON c."categoryId" = pc."categoryId"
      GROUP BY
        pc."productId"
    ),

    product_variant_agg AS (
      SELECT
        pv."productId",
        pv."productVariantId",
        pv."productVariantInternalId",
        pv.color,
        pv.price,
        pv.size,
        pv."inventoryCount",
        pvi_agg."productVariantImages",
        pv."createdAt"
      FROM
        "productVariants" pv
        LEFT JOIN (
          SELECT
            pvi."productVariantId",
            ARRAY_AGG(pvi."imgUrl") AS "productVariantImages"
          FROM
            "productVariantImages" pvi
          GROUP BY
            pvi."productVariantId"
        ) AS pvi_agg ON pvi_agg."productVariantId" = pv."productVariantId"
    ),

    sales AS (
      SELECT
     orders."productVariantId",
     COUNT(*) AS sales
      FROM
      "orderItems" orders
      WHERE orders."shippingStatus" != 'CANCELLED'
      GROUP BY orders."productVariantId"
    )

    SELECT
      p."productId",
      p."productInternalId",
      p."name",
      p."description",
      p."discount",
      p."onDiscount",
      p."createdAt",
      cat.categories,
      pv_agg.*,
      COALESCE(CAST(sales.sales AS INTEGER), 0) AS sales
    FROM
      products p
      JOIN category_agg cat ON cat."productId" = p."productId"
      LEFT JOIN product_variant_agg pv_agg ON pv_agg."productId" = p."productId"
      LEFT JOIN sales ON sales."productVariantId" = pv_agg."productVariantId"
      ORDER BY sales DESC
      LIMIT 10
      ;`,
  );

  return productVariants as unknown as TProductVariantWithDetails[];
};
