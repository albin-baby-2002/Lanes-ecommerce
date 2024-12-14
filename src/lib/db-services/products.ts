"use server";
import { db } from "@/drizzle/db";
import {
  categories,
  productCategories,
  products,
  productVariantImages,
  productVariants,
} from "@/drizzle/schema";
import { TProductsData } from "@/sections/admin/products/views/products-view";
import { eq, sql } from "drizzle-orm";

type TProduct = typeof products.$inferInsert;

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

export const getAllProductsDataUsingAggregation = async () => {
  const productsData = (await db.execute(
    sql`
      SELECT
        p."productId",
        p."productInternalId",
        p."name",
        p."description",
        p."discount",
        p."onDiscount",
        p."createdAt",
        p."updatedAt",

        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'categoryId', c."categoryId",
              'categoryInternalId', c."categoryInternalId"
            )
          )
          FROM "productCategories" pc
          INNER JOIN "categories" c
            ON pc."categoryId" = c."categoryId"
          WHERE pc."productId" = p."productId"
        ) AS categories,

        (
          SELECT JSON_AGG(variant_data)
          FROM (
            SELECT
              pv."productVariantId",
              pv."color",
              pv."size",
              pv."inventoryCount",
              pv."price",
              pv."onSale",
              (
                SELECT ARRAY_AGG(pvi."imgUrl")
                FROM "productVariantImages" pvi
                WHERE pvi."productVariantId" = pv."productVariantId"
              ) AS "productVariantImages"
            FROM "productVariants" pv
            WHERE pv."productId" = p."productId"
            GROUP BY pv."productVariantId", pv."color", pv."size", pv."inventoryCount", pv."price", pv."onSale"
          ) AS variant_data
        ) AS "productVariants"

      FROM "products" p
      ORDER BY p."productId";
    `,
  )) as unknown as TProductsData[];

  console.log("\n", productsData[0].productVariants, "products input \n");

  return productsData;
};

export const getProductDataWithVariantsAndImages = async (
  productId: string,
) => {
  const productsData = (await db.execute(sql`
    SELECT
      ${products.productId} AS "productId",
      ${products.productInternalId} AS "productInternalId",
      ${products.name} AS "name",
      ${products.description} AS "description",
      ${products.discount} AS "discount",
      ${products.onDiscount} AS "onDiscount",
      ${products.createdAt} AS "createdAt",
      ${products.updatedAt} AS "updatedAt",
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'categoryId', ${categories.categoryId},
          'categoryInternalId', ${categories.categoryInternalId}
        )
      ) AS categories,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'productVariantId', ${productVariants.productVariantId},
          'color', ${productVariants.color},
          'size', ${productVariants.size},
          'inventoryCount', ${productVariants.inventoryCount},
          'price', ${productVariants.price},
          'onSale', ${productVariants.onSale},
          'productVariantImages', img_data.images
        )
      ) AS "productVariants"
    FROM ${products}
    INNER JOIN ${productVariants}
      ON ${products.productId} = ${productVariants.productId}
    INNER JOIN (
      SELECT
        ${productVariantImages.productVariantId} AS "productVariantId",
        ARRAY_AGG(${productVariantImages.imgUrl}) AS images
      FROM ${productVariantImages}
      GROUP BY ${productVariantImages.productVariantId}
    ) AS img_data
      ON ${productVariants.productVariantId} = img_data."productVariantId"
    INNER JOIN ${productCategories}
      ON ${products.productId} = ${productCategories.productId}
    INNER JOIN ${categories}
      ON ${productCategories.categoryId} = ${categories.categoryId}
    WHERE ${products.productId} = ${productId}
    GROUP BY ${products.productId}
    ORDER BY ${products.productId};
  `)) as unknown as TProductsData[];

  return productsData[0];
};

export const getAllProductVariantsWithDetails = async () => {
  const productsData = (await db.execute(sql`
    SELECT
      p."productId",
      p."productInternalId",
      p."name",
      p."description",
      p."discount",
      p."onDiscount",
      p."createdAt",
      p."updatedAt",

      -- Aggregate categories for each product variant
      (
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'categoryId', c."categoryId",
            'categoryInternalId', c."categoryInternalId"
          )
        )
        FROM "productCategories" pc
        INNER JOIN "categories" c
          ON pc."categoryId" = c."categoryId"
        WHERE pc."productId" = p."productId"
      ) AS categories,

      -- Product variant details
      pv."productVariantId",
      pv."color",
      pv."size",
      pv."inventoryCount",
      pv."price",
      pv."onSale",

      -- Aggregate images for each product variant
      img_data.images AS "productVariantImages"

    FROM "products" p
    INNER JOIN "productVariants" pv
      ON p."productId" = pv."productId"

    -- Aggregate images for product variants
    LEFT JOIN (
      SELECT
        pvi."productVariantId",
        ARRAY_AGG(pvi."imgUrl") AS images
      FROM "productVariantImages" pvi
      GROUP BY pvi."productVariantId"
    ) AS img_data
      ON pv."productVariantId" = img_data."productVariantId"

    ORDER BY p."productId", pv."productVariantId";
  `)) as unknown as TProductVariantData[];

  return productsData;
};

