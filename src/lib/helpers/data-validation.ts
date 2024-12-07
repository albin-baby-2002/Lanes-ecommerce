"use server";
import { TCategoryData } from "@/sections/admin/categories/add-edit-category-modal";
import { CategorySchema, ProductSchema, UserProfileSchema } from "../zod-schema";
import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { z } from "zod";


export type TUser = z.infer<typeof UserProfileSchema>;

//-----------------------------------------------------------------------------------------

// fn to validate category data using zod

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

//-----------------------------------------------------------------------------------------

//fn to validate product data using zod schema

export const parseProductData = async (product: TProductData) => {

  // validate the data using zod

  const result = ProductSchema.safeParse(product);

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

  const parsedProduct: TProductData | undefined = result.data;

  if (!parsedProduct) {
    throw new Error("Unexpected Error. Failed to process product data");
  }

  return parsedProduct;
};

// fn to validate user data using zod

export const parseUserData = async (user: TUser) => {
  // validate the data using zod

  const result = UserProfileSchema.safeParse(user);

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

  const parsedUser: TUser | undefined = result.data;

  if (!parsedUser) {
    throw new Error("Unexpected Error. Failed to process users data");
  }

  return parsedUser;
};