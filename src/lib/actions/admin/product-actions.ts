//-----------------------------------------------------------------------------------------

import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { checkIsAdmin } from "../auth-actions";
import { parseProductData } from "@/lib/helpers/data-validation";
import { findProductByName, insertProduct } from "@/lib/db-services/products";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";
import { db } from "@/drizzle/db";
import {
  productCategories,
  products,
  productVariantImages,
  productVariants,
} from "@/drizzle/schema";

// server action to create a new product on admin req

// todo - authenticate to protect server action

export const createProductWithVariantsAndCategory = async (
  product: TProductData,
) => {
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

    await db.transaction(async (tx) => {
      const {
        productVariants: ProductVariantsInfo,
        categories,
        ...productInfo
      } = parsedProduct;

      // insert the new product info

      const newProduct = await tx
        .insert(products)
        .values(productInfo)
        .returning({ productId: products.productId });

      const productId = newProduct[0].productId;

      // map categories-id and productId to insert into the product categories table

      const categoryInsert = categories.map((categoryId) => {
        return { productId, categoryId };
      });

      // insert productCatgories

      await tx.insert(productCategories).values(categoryInsert);

      ProductVariantsInfo.forEach(async (val) => {
        const { productVariantImages: variantImages, ...variantInfo } = val;

        const variantInsert = { ...variantInfo, productId };

        const newVariant = await tx
          .insert(productVariants)
          .values(variantInsert)
          .returning({ productVariantId: productVariants.productVariantId });

        const imagesInsert = variantImages.map((imgUrl) => {
          return { imgUrl, productVariantId: newVariant[0].productVariantId };
        });

        await tx.insert(productVariantImages).values(imagesInsert);
      });

      // if insert success end success repsonse

      response.success = true;
      response.message = "Successfully created new category";
      return response;
    });

    response.message = "Unexpected Error Failed to Insert Product Try Again";

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
