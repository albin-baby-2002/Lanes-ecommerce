//-----------------------------------------------------------------------------------------

import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { checkIsAdmin } from "../auth-actions";
import { parseProductData } from "@/lib/helpers/data-validation";
import { findProductByName, insertProduct } from "@/lib/db-services/products";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";

// server action to create a new product on admin req

// todo - authenticate to protect server action

export const createProduct = async (product: TProductData) => {
  try {
    // create a resp obj
    const response = { success: false, message: "" }; // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }

    let parsedProduct: TProductData;

    try {
      parsedProduct = await parseProductData(product);
    } catch (error: any) {
      response.message = error.message;
      return response;
    }
    // check a category with same name exist if return an error resp

    const existingProduct = await findProductByName(parsedProduct.name);

    if (existingProduct?.length > 0) {
      response.message = `Product with name ${parsedProduct.name} already exist`;
      return response;
    }

    // insert the data to db if all checks are done

    await insertProduct(parsedProduct);

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
