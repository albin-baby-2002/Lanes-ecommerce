import React from "react";
import SearchAndActions from "../search-and-actions";
import { db } from "@/drizzle/db";
import {
  categories,
  productCategories,
  products,
  productVariantImages,
  productVariants,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  getAllCategories,
  getAllCategoriesWithSpecificFields,
} from "@/lib/db-services/category";
import ProductActionsModals from "../products-action-modals";

const ProductsView = async () => {

  const categoriesOptions = await getAllCategoriesWithSpecificFields({
    label: categories.name,
    value: categories.categoryId,
  });

  const productsData = await db
    .select()
    .from(products)
    .innerJoin(
      productVariants,
      eq(products.productId, productVariants.productId),
    )
    .innerJoin(
      productVariantImages,
      eq(
        productVariants.productVariantId,
        productVariantImages.productVariantId,
      ),
    )
    .innerJoin(
      productCategories,
      eq(products.productId, productCategories.productId),
    )
    .innerJoin(
      categories,
      eq(productCategories.categoryId, categories.categoryId),
    );

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Products</p>
      </div>

      <SearchAndActions />

      <ProductActionsModals  categoryOptions={categoriesOptions}/>
    </div>
  );
};

export default ProductsView;