"use server";

import { TCategoryData } from "@/sections/admin/categories/add-edit-category";
import { CategorySchema } from "../schemas";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { and, eq, ne } from "drizzle-orm";

//-----------------------------------------------------------------------------------------

// server action to create a new catgory on admin req

// todo - authenticate to protect server action

export const createCategory = async (category: TCategoryData) => {
  try {
    // validate the data using zod

    const result = CategorySchema.safeParse(category);

    // create a resp obj

    const response = { success: false, message: "" };

    // check for errors after parsing and give error resp

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

    // check for parsed data and error if data not found

    const parsedCategory = result.data;

    if (!parsedCategory) {
      response.message = "Unexpected Error. Failed to Parse Data";
      return response;
    }

    // check a category with same name exist if return an error resp

    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.name, parsedCategory.name));

    if (existingCategory.length > 0) {
      response.message = `Category with name ${parsedCategory.name} already exist`;
      return response;
    }

    // insert the data to db if all checks are done

    await db.insert(categories).values({
      ...parsedCategory,
      onOffer: parsedCategory.onOffer === "True",
      offerDiscount: Number(parsedCategory.offerDiscount),
    });

    // if insert success end success repsonse

    response.success = true;
    response.message = "Successfully created new category";

    return response;
  } catch (error: any) {
    // if any unexpected error occur return error resp

    console.log(error, "error");

    return {
      success: false,
      message: "Sorry,Something went wrong. Please try again later.",
      details: error.message,
    };
  }
};

//-----------------------------------------------------------------------------------------

// server action to edit category

// todo - authenticate to protect server action

export const EditCategory = async (id: string, category: TCategoryData) => {
  try {

    // validate the data using zod

    const result = CategorySchema.safeParse(category);

    // create a resp obj

    const response = { success: false, message: "" };

    // check for errors after parsing and give error resp

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

    // check for parsed data and error if data not found

    const parsedCategory = result.data;

    if (!parsedCategory) {
      response.message = "Unexpected Error. Failed to Parse Data";
      return response;
    }

    //check the category to edit exist

    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    if (existingCategory.length <= 0) {
      response.message = ` ${parsedCategory.name} category not found `;
      return response;
    }

    // check a category with same name exist if return an error resp

    const categoryWithMatchingName = await db
      .select()
      .from(categories)
      .where(
        and(eq(categories.name, parsedCategory.name), ne(categories.id, id)),
      );

    if (categoryWithMatchingName.length > 0) {
      response.message = `Category with name ${parsedCategory.name} already exist choose a different name`;
      return response;
    }

    // data to be updated and update using drizzle

    const updatedCategory = {
      ...existingCategory,
      ...parsedCategory,
      onOffer: parsedCategory.onOffer === "True",
      offerDiscount: Number(parsedCategory.offerDiscount),
    };


    await db
    .update(categories)
    .set(updatedCategory)
    .where(eq(categories.id, id));

    // if update success end success repsonse

    response.success = true;
    response.message = `Successfully updated ${parsedCategory.name}`;

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
