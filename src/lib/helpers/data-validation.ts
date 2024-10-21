"use server"
import { TCategoryData } from "@/sections/admin/categories/add-edit-category-modal";
import { CategorySchema } from "../zod-schema";

export const parseCatgoryData = async (category: TCategoryData) => {
  // validate the data using zod

  const result = CategorySchema.safeParse(category);

  // check for errors after parsing and give error resp

  const errors = result.error?.errors;

  if (errors) {
    const firstError = errors[0].message;

    const errorRespMessage =
      firstError === "Required"
        ? firstError + " - " + errors[0].path[0]
        : firstError;

    throw new Error(errorRespMessage);
  }

  // check for parsed data and error if data not found

  const parsedCategory: TCategoryData | undefined = result.data;

  if (!parsedCategory) {
    throw new Error("Unexpected Error. Failed to process category data");
  }

  return parsedCategory;
};