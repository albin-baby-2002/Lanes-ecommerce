"use server";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { Column, eq,  Table } from "drizzle-orm";

type TCategory = typeof categories.$inferInsert;

export const getAllCategories = async () => {
  return await db.select().from(categories);
};


export const getAllCategoriesWithSpecificFields = async (filter?:SelectedFields) => {
  return await db.select(filter).from(categories);
};

export const findCategoryByName = async (name: string) => {
  return await db.select().from(categories).where(eq(categories.name, name));
};

export const findCategoryById = async (id: string) => {
  return await db
    .select()
    .from(categories)
    .where(eq(categories.categoryId, id));
};

export const insertCategory = async (category: TCategory) => {
  return await db.insert(categories).values(category);
};

export const updateCategoryById = async (id: string, category: TCategory) => {
  return await db
    .update(categories)
    .set(category)
    .where(eq(categories.categoryId, id));
};

export const deleteCategoryById = async (id: string) => {
  return await db.delete(categories).where(eq(categories.categoryId, id));
};
