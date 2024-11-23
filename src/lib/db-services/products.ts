"use server";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type TProduct = typeof products.$inferInsert;

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
