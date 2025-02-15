"use server";
//-----------------------------------------------------------------------------------------

import { TProductData } from "@/sections/admin/products/add-edit-product-modal";
import { checkIsAdmin } from "../auth-actions";
import { parseProductData } from "@/lib/helpers/data-validation";
import {
  findProductById,
  findProductByName,
  getProductsWithVariants,
} from "@/lib/db-services/products";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";
import { db } from "@/drizzle/db";
import {
  productCategories,
  products,
  productVariantImages,
  productVariants,
} from "@/drizzle/schema";
import { and, eq, inArray } from "drizzle-orm";

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

export const EditProduct = async (product: TProductData) => {
  const response = { success: false, message: "" };


  try {
    // Check admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;
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

    const productId = parsedProduct.productId;

    if (!productId) {
      response.message = "Failed to fetch product id";
      return response;
    }

    // Check for existing product by Id

    const existingProduct = await findProductById(productId);

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
          .where(eq(products.productId, productId));

        // Update categories

        const existingCategoriesResp = await tx
          .select({ id: productCategories.categoryId })
          .from(productCategories)
          .where(eq(productCategories.productId, productId));

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
            productId,
            categoryId,
          }));

          await tx.insert(productCategories).values(categoryInsert);
        }

        // Update variants and images

        const existingVariants = await tx
          .select()
          .from(productVariants)
          .where(eq(productVariants.productId, productId));

        // loop through existing values and check is that variant is in the input(productVariantsInfo) passed now
        // if the value is present update to that values images
        // if variant not in current input (productVariantsInfo) then delete it

        for (const existingVariant of existingVariants) {
          const updatedVariant = ProductVariantsInfo.find(
            (pv) => pv.productVariantId === existingVariant.productVariantId,
          );

          if (!updatedVariant) {
            // Delete variant and its images if not in new data

            await tx
              .delete(productVariantImages)
              .where(
                eq(
                  productVariantImages.productVariantId,
                  existingVariant.productVariantId,
                ),
              );

            await tx
              .delete(productVariants)
              .where(
                eq(
                  productVariants.productVariantId,
                  existingVariant.productVariantId,
                ),
              );
          } else {
            // Update variant if it exists and has changes

            const {
              productVariantImages: updatedProductVariantImages,
              ...variantInfo
            } = updatedVariant;

            await tx
              .update(productVariants)
              .set(variantInfo)
              .where(
                eq(
                  productVariants.productVariantId,
                  existingVariant.productVariantId,
                ),
              );

            // Sync variant images

            const existingImages = await tx
              .select({ imgUrl: productVariantImages.imgUrl })
              .from(productVariantImages)
              .where(
                eq(
                  productVariantImages.productVariantId,
                  existingVariant.productVariantId,
                ),
              );

            const imagesToDelete = existingImages.filter(
              (ei) => !updatedProductVariantImages.includes(ei.imgUrl),
            );

            const imagesToDeleteString = imagesToDelete.map(
              (val) => val.imgUrl,
            );

            const imagesToAdd = updatedProductVariantImages.filter(
              (ni) => !existingImages.some((ei) => ei.imgUrl === ni),
            );

            if (imagesToDelete.length > 0) {
              await tx
                .delete(productVariantImages)
                .where(
                  inArray(productVariantImages.imgUrl, imagesToDeleteString),
                );
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
            const {
              productVariantId: newVariantNullField,
              productVariantImages: variantImages,
              ...variantInfo
            } = val;

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
  } catch (error: any) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Sorry, something went wrong. Please try again later.",
      details: error.message,
    };
  }
};

// product action to delete a complete product with its variants

export const DeleteProduct = async (productId: string) => {
  const response = { success: false, message: "" };

  try {
    // Check admin
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;
      return response;
    }

    // Validate productId
    if (!productId || typeof productId !== "string") {
      response.message = "Invalid product ID provided.";
      return response;
    }

    // Check for existing product by ID
    const existingProduct = await findProductById(productId);
    if (!existingProduct[0]) {
      response.message = "Unexpected Error! Failed To Find Product Info.";
      return response;
    }

    // Perform transaction
    try {
      await db.transaction(async (tx) => {
        const details = await getProductsWithVariants({productId});

        const {
          productVariants: productVariantsInfo,
          categories,
          ...rest
        }  = details[0]

        // Delete categories
        const categoriesToDelete = categories.map((cat) => cat.categoryId);
        await tx
          .delete(productCategories)
          .where(
            and(
              inArray(productCategories.categoryId, categoriesToDelete),
              eq(productCategories.productId, productId),
            ),
          );

        // Delete variants and images in bulk
        const variantIdsToDelete = productVariantsInfo.map(
          (variant) => variant.productVariantId,
        );
        const imagesToDelete = productVariantsInfo.flatMap(
          (variant) => variant.productVariantImages,
        );

        await tx
          .delete(productVariantImages)
          .where(inArray(productVariantImages.imgUrl, imagesToDelete));
        await tx
          .delete(productVariants)
          .where(inArray(productVariants.productVariantId, variantIdsToDelete));

        await tx.delete(products).where(eq(products.productId, productId));
      });

      // Successful deletion
      response.success = true;
      response.message = "Successfully deleted product.";
    } catch (txError) {
      console.error("Transaction Error:", txError);
      response.message = "Failed to delete product. Please try again.";
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
