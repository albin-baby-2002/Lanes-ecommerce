"use server";
import { TCategoryData } from "@/sections/admin/categories/add-edit-category-modal";
import {
  deleteCategoryById,
  findCategoryById,
  findCategoryByName,
  insertCategory,
  updateCategoryById,
} from "@/lib/db-services/category";
import { parseCatgoryData } from "@/lib/helpers/data-validation";
import { checkIsAdmin } from "../auth-actions";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";

//-----------------------------------------------------------------------------------------

// server action to create a new catgory on admin req

export const createCategory = async (category: TCategoryData) => {
  try {
    // create a resp obj

    const response = { success: false, message: "" };

    // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }

    let parsedCategory: TCategoryData;

    try {
      parsedCategory = await parseCatgoryData(category);
    } catch (error: any) {
      response.message = error.message;
      return response;
    }
    // check a category with same name exist if return an error resp

    const existingCategory = await findCategoryByName(parsedCategory.name);

    if (existingCategory?.length > 0) {
      response.message = `Category with name ${parsedCategory.name} already exist`;
      return response;
    }

    // insert the data to db if all checks are done

    await insertCategory({
      ...parsedCategory,
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

export const EditCategory = async (id: string, category: TCategoryData) => {
  try {
    // create a resp obj

    const response = { success: false, message: "" };

    // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }
    let parsedCategory: TCategoryData;

    try {
      parsedCategory = await parseCatgoryData(category);
    } catch (error: any) {
      response.message = error.message;
      return response;
    }
    //check the category to edit exist

    const existingCategory = await findCategoryById(id);

    if (existingCategory.length <= 0) {
      response.message = ` ${parsedCategory.name} category not found `;
      return response;
    }

    // check a category with same name exist and if it is not the category to edit return an error resp

    const categoryWithMatchingName = await findCategoryByName(
      parsedCategory.name,
    );

    if (
      categoryWithMatchingName.length > 0 &&
      categoryWithMatchingName[0].categoryId !== id
    ) {
      response.message = `Category with name ${parsedCategory.name} already exist choose a different name`;
      return response;
    }

    // data to be updated and update using drizzle

    const updatedCategory = {
      ...existingCategory,
      ...parsedCategory,
    };

    await updateCategoryById(id, updatedCategory);

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

//-----------------------------------------------------------------------------------------

// server action to delete a category

export const deleteCategory = async (id: string) => {
  try {
    // create a resp obj

    const response = { success: false, message: "" };

    // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }

    // check that the category exist

    const existingCategory = await findCategoryById(id);

    if (existingCategory.length <= 0) {
      response.message = "Unexpected error ! Failed to find the category";
      return response;
    }

    //  delete the category

    await deleteCategoryById(id);

    response.success = true;
    response.message = "Successfully Deleted The Category";

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
