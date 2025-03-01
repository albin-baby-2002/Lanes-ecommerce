"use server";
import { TCategoryData } from "@/sections/admin/categories/add-edit-category-modal";
import {
  CategorySchema,
  orderItemSchema,
  ProductSchema,
  UserProfileSchema,
} from "../zod-schema";
import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { z } from "zod";
import { TOrderItemForm } from "@/sections/admin/orders/edit-order-modal";

export type TParsedUser = z.infer<typeof UserProfileSchema>;

//-----------------------------------------------------------------------------------------

export const parseCatgoryData = async (category: TCategoryData) => {
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

export const parseProductData = async (product: TProductData) => {
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

//-----------------------------------------------------------------------------------------

export const parseOrderData = async (order: TOrderItemForm) => {
  const result = orderItemSchema.safeParse(order);

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

  const parsedUser: TOrderItemForm | undefined = result.data;

  if (!parsedUser) {
    throw new Error("Unexpected Error. Failed to process users data");
  }

  return parsedUser;
};

//-----------------------------------------------------------------------------------------

export const parseUserData = async (user: TParsedUser) => {
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

  const parsedUser: TParsedUser | undefined = result.data;

  if (!parsedUser) {
    throw new Error("Unexpected Error. Failed to process users data");
  }

  return parsedUser;
};
