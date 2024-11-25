'use server'
//-----------------------------------------------------------------------------------------

import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { checkIsAdmin } from "../auth-actions";
import { parseProductData } from "@/lib/helpers/data-validation";
import { findProductByName } from "@/lib/db-services/products";
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
  const response = { success: false, message: "" };

  try {
    // Check admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;
      return response;
    }

    // Parse product data

    let parsedProduct: TProductData;

    try {
      parsedProduct = await parseProductData(product);
    } catch (error: any) {
      response.message = `Validation Error: ${error.message}`;
      return response;
    }

    // Check for existing product

    const existingProduct = await findProductByName(parsedProduct.name);

    if (existingProduct?.length > 0) {
      response.message = `Product with name ${parsedProduct.name} already exists.`;
      return response;
    }

    // Perform transaction

    try {
      await db.transaction(async (tx) => {
        const {
          productVariants: ProductVariantsInfo,
          categories,
          ...productInfo
        } = parsedProduct;

        // Insert product

        const [newProduct] = await tx
          .insert(products)
          .values(productInfo)
          .returning({ productId: products.productId });

        const productId = newProduct.productId;

        // Insert categories

        const categoryInsert = categories.map((categoryId) => ({
          productId,
          categoryId,
        }));

        await tx.insert(productCategories).values(categoryInsert);

        // Insert variants and images

        for (const val of ProductVariantsInfo) {
          const { productVariantImages: variantImages, ...variantInfo } = val;

          const [newVariant] = await tx
            .insert(productVariants)
            .values({ ...variantInfo, productId })
            .returning({ productVariantId: productVariants.productVariantId });

          const imagesInsert = variantImages.map((imgUrl) => ({
            imgUrl,
            productVariantId: newVariant.productVariantId,
          }));

          await tx.insert(productVariantImages).values(imagesInsert);
        }
      });

      // Success response

      response.success = true;
      response.message = "Successfully created new product.";
    } catch (txError) {
      console.error("Transaction Error:", txError);
      response.message = "Failed to insert product. Please try again.";

      throw txError;
    }

    return response;
  } catch (error: any) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Sorry, something went wrong. Please try again later.",
      details: error.message,
    };
  }
};
