"use server";

import { TCategoryData } from "@/sections/admin/categories/add-edit-category";
import { CategorySchema } from "../schemas";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const createCategory = async (category: TCategoryData) => {
  try {
    const result = CategorySchema.safeParse(category);

    const response = { success: false, message: "" };

    const errors = result.error?.errors;

    if (errors) {
      const firstError = errors[0].message;

      const errorRespMessage =
        firstError === "Required"
          ? firstError + " - " + errors[0].path[0]
          : firstError;

      response.message = errorRespMessage;
      return response;
    }

    const data = result.data;

    if (!data) {
      response.message = "Unexpected Error. Failed to Parse Data";
      return response;
    }

    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.name, data.name));

    if (existingCategory.length > 0) {
      response.message = `Category with name ${data.name} already exist`;
      return response;
    }

    await db.insert(categories).values({
      ...data,
      onOffer: data.onOffer === "True",
      offerDiscount: Number(data.offerDiscount),
    });

    response.success = true;
    response.message = "Successfully created new category";

    return response;
  } catch (error: any) {
    console.log(error, "error");

    return {
      success: false,
      message: "Sorry,Something went wrong. Please try again later.",
      details: error.message,
    };
  }
};
