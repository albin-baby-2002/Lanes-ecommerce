"use server";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

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
  // Construct the base SQL query
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
    LIMIT ${limit || 10};
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

export const getAllIndividualVariantsWithDetails = async () => {
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
            c."categoryInternalId"
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
    ORDER BY
      p."productId"; `,
  );
  return productVariants as unknown as TProductVariantWithDetails[];
};

//---------------------------------------------------------------------------------

export interface TProductVariantDetails {
  productVariantId: string
  productVariantInternalId: number
  productId: string
  color: string
  size: string
  inventoryCount: number
  price: number
  onSale: boolean
  createdAt: string
  updatedAt: string
  productInternalId: number
  name: string
  description: string
  discount: number
  productVariantImages:string[]
  onDiscount: boolean
  variants: Variant[]
}

export interface Variant {
  productVariantId: string
  productVariantInternalId: number
  color: string
  size: string
  inventoryCount: number
  onSale: boolean
}


export const getProductVariantDetails = async(variantId: string) => {

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
              prdVar."onSale"
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
  )) as unknown as TProductVariantDetails[]

  return variantDetails[0];
};
