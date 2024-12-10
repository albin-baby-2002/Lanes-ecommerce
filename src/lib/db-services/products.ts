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
  const productsData = (await db.execute(sql`
    SELECT
      products."productId",
      products."productInternalId",
      products."name",
      products."description",
      products."discount",
      products."onDiscount",
      products."createdAt",
      products."updatedAt",
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'categoryId', "categories"."categoryId",
        'categoryInternalId',"categories"."categoryInternalId"
        )
      ) AS categories,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'productVariantId', "productVariants"."productVariantId",
          'color', "productVariants"."color",
          'size', "productVariants"."size",
          'inventoryCount', "productVariants"."inventoryCount",
          'price', "productVariants"."price",
          'onSale', "productVariants"."onSale",
          'productVariantImages', img_data.images
        )
      ) AS "productVariants"
    FROM "products"
    INNER JOIN "productVariants"
      ON products."productId" = "productVariants"."productId"
    INNER JOIN (
      SELECT
        "productVariantImages"."productVariantId",
        ARRAY_AGG("productVariantImages"."imgUrl") AS images
      FROM "productVariantImages"
      GROUP BY "productVariantImages"."productVariantId"
    ) AS img_data
      ON "productVariants"."productVariantId" = img_data."productVariantId"
    INNER JOIN "productCategories"
      ON products."productId" = "productCategories"."productId"
    INNER JOIN "categories"
      ON "productCategories"."categoryId" = "categories"."categoryId"
    GROUP BY products."productId"
    ORDER BY products."productId";
  `)) as unknown as TProductsData[];

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
  const productsData = (await db.execute(sql` SELECT
      ${products.productId} AS "productId",
      ${products.productInternalId} AS "productInternalId",
      ${products.name} AS "name",
      ${products.description} AS "description",
      ${products.discount} AS "discount",
      ${products.onDiscount} AS "onDiscount",
      ${products.createdAt} AS "createdAt",
      ${products.updatedAt} AS "updatedAt",
      ${categories.categoryId} AS "categoryId",
      ${categories.categoryInternalId} AS "categoryInternalId",
      ${productVariants.productVariantId} AS "productVariantId",
      ${productVariants.color} AS "color",
      ${productVariants.size} AS "size",
      ${productVariants.inventoryCount} AS "inventoryCount",
      ${productVariants.price} AS "price",
      ${productVariants.onSale} AS "onSale",
      img_data.images AS "productVariantImages"
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
    ORDER BY ${products.productId}, ${productVariants.productVariantId};
  `)) as unknown as TProductVariantData[];

  return productsData;
};
