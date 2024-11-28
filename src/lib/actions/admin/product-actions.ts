"use server";
//-----------------------------------------------------------------------------------------

import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { checkIsAdmin } from "../auth-actions";
import { parseProductData } from "@/lib/helpers/data-validation";
import { findProductById, findProductByName } from "@/lib/db-services/products";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";
import { db } from "@/drizzle/db";
import {
  productCategories,
  products,
  productVariantImages,
  productVariants,
} from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";

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

// server action to edit existing product and variants

async function EditProduct( product: TProductData) {
  const response = { success: false, message: "" };

  try {
    // Check admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;
      return response;
    }

    if(!product.productId){
      response.message = 'Failed to fetch product id';
      return response;
    }

    // Parse product data

    let parsedProduct;

    try {
      parsedProduct = await parseProductData(product);
    } catch (error: any) {
      response.message = `Validation Error: ${error?.message}`;
      return response;
    }

    // Check for existing product by Id

    const existingProduct = await findProductById(product?.productId);

    // if product not found return

    if (!existingProduct[0]) {
      response.message = "Failed To Find Product Info";
      return response;
    }

    // Perform transaction
    try {
      await db.transaction(async (tx) => {
        const {
          productVariants: ProductVariantsInfo,
          categories: newCategories,
          ...productInfo
        } = parsedProduct;

        // Update product info

        await tx
          .update(products)
          .set({ ...productInfo, updatedAt: new Date() })
          .where(eq(products.productId, product.productId));

        // Update categories

        const existingCategoriesResp = await tx
          .select({ id: productCategories.categoryId })
          .from(productCategories)
          .where(eq(productCategories.productId, product.productId));

        // extract the id

        const existingCategories = existingCategoriesResp.map((val) => val.id);

        // categories to delete and add

        const categoriesToDelete = existingCategories.filter(
          (ec) => !newCategories.includes(ec),
        );

        const categoriesToAdd = newCategories.filter(
          (nc) => !existingCategories.some((ec) => ec === nc),
        );

        if (categoriesToDelete.length > 0) {
          await tx
            .delete(productCategories)
            .where(inArray(productCategories.categoryId, categoriesToDelete));
        }

        if (categoriesToAdd.length > 0) {
          const categoryInsert = categoriesToAdd.map((categoryId) => ({
            productId:product.productId,
            categoryId,
          }));

          await tx.insert(productCategories).values(categoryInsert);
        }

        // Update variants and images

        const existingVariants = await tx
          .select()
          .from(productVariants)
          .where(eq(productVariants.productId,productId));

        for (const existingVariant of existingVariants) {

          const newVariant = ProductVariantsInfo.find(
            (pv) => pv.productVariantId === existingVariant.productVariantId,
          );

          if (!newVariant) {
            // Delete variant and its images if not in new data
            await tx
              .delete(productVariantImages)
              .where(
                productVariantImages.productVariantId.equals(
                  existingVariant.productVariantId,
                ),
              );
            await tx
              .delete(productVariants)
              .where(
                productVariants.productVariantId.equals(
                  existingVariant.productVariantId,
                ),
              );
          } else {
            // Update variant if it exists and has changes
            const { productVariantImages, ...variantInfo } = newVariant;

            await tx
              .update(productVariants)
              .set(variantInfo)
              .where(
                productVariants.productVariantId.equals(
                  existingVariant.productVariantId,
                ),
              );

            // Sync variant images
            const existingImages = await tx
              .select(productVariantImages.imgUrl)
              .from(productVariantImages)
              .where(
                productVariantImages.productVariantId.equals(
                  existingVariant.productVariantId,
                ),
              );

            const imagesToDelete = existingImages.filter(
              (ei) => !productVariantImages.includes(ei.imgUrl),
            );
            const imagesToAdd = productVariantImages.filter(
              (ni) => !existingImages.some((ei) => ei.imgUrl === ni),
            );

            if (imagesToDelete.length > 0) {
              await tx
                .delete(productVariantImages)
                .where(productVariantImages.imgUrl.in(imagesToDelete));
            }

            if (imagesToAdd.length > 0) {
              const imagesInsert = imagesToAdd.map((imgUrl) => ({
                imgUrl,
                productVariantId: existingVariant.productVariantId,
              }));
              await tx.insert(productVariantImages).values(imagesInsert);
            }
          }
        }

        // Add new variants
        for (const val of ProductVariantsInfo) {
          if (
            !existingVariants.some(
              (ev) => ev.productVariantId === val.productVariantId,
            )
          ) {
            const { productVariantImages: variantImages, ...variantInfo } = val;

            const [newVariant] = await tx
              .insert(productVariants)
              .values({ ...variantInfo, productId })
              .returning({
                productVariantId: productVariants.productVariantId,
              });

            const imagesInsert = variantImages.map((imgUrl) => ({
              imgUrl,
              productVariantId: newVariant.productVariantId,
            }));
            await tx.insert(productVariantImages).values(imagesInsert);
          }
        }
      });

      response.success = true;
      response.message = "Successfully updated product.";
    } catch (txError) {
      console.error("Transaction Error:", txError);
      response.message = "Failed to update product. Please try again.";
      throw txError;
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Sorry, something went wrong. Please try again later.",
      details: error.message,
    };
  }
}
