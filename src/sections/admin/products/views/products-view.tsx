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
import { eq, sql } from "drizzle-orm";
import {
  getAllCategories,
  getAllCategoriesWithSpecificFields,
} from "@/lib/db-services/category";
import ProductActionsModals from "../products-action-modals";
import { DataTable } from "@/components/table/data-table";
import { productsColumns } from "../datatable-columns";
import { TProductData } from "../add-edit-product-modal";

export interface TCategoryOptions {
  label: string;
  value: string;
}
export interface TProductsData {
  productId: string
  productInternalId: number
  name: string
  description: string
  discount: number
  onDiscount: boolean
  createdAt: string
  updatedAt: string
  categories: Category[]
  productVariants: ProductVariant[]
}

export interface Category {
  categoryId: string
  categoryInternalId: number
}

export interface ProductVariant {
  productVariantId: string
  color: string
  size: string
  inventoryCount: number
  price: number
  onSale: boolean
  productVariantImages: string[]
}

const ProductsView = async () => {
  const categoriesOptions = (await getAllCategoriesWithSpecificFields({
    label: categories.name,
    value: categories.categoryId,
  })) as unknown as TCategoryOptions[];

  const productsData = await db.execute(sql`
    SELECT
      products."productId",
      products."productInternalId",
      products."name",
      products."description",
      products."discount",
      products."onDiscount",
      products."createdAt",
      products."updatedAt",
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'categoryId', "categories"."categoryId",
        'categoryInternalId',"categories"."categoryInternalId"
        )
      ) AS categories,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'productVariantId', "productVariants"."productVariantId",
          'color', "productVariants"."color",
          'size', "productVariants"."size",
          'inventoryCount', "productVariants"."inventoryCount",
          'price', "productVariants"."price",
          'onSale', "productVariants"."onSale",
          'productVariantImages', img_data.images
        )
      ) AS "productVariants"
    FROM "products"
    INNER JOIN "productVariants"
      ON products."productId" = "productVariants"."productId"
    INNER JOIN (
      SELECT
        "productVariantImages"."productVariantId",
        ARRAY_AGG("productVariantImages"."imgUrl") AS images
      FROM "productVariantImages"
      GROUP BY "productVariantImages"."productVariantId"
    ) AS img_data
      ON "productVariants"."productVariantId" = img_data."productVariantId"
    INNER JOIN "productCategories"
      ON products."productId" = "productCategories"."productId"
    INNER JOIN "categories"
      ON "productCategories"."categoryId" = "categories"."categoryId"
    GROUP BY products."productId"
    ORDER BY products."productId";
  `) as unknown as TProductsData[];


  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Products</p>
      </div>

      <SearchAndActions />

      <ProductActionsModals categoryOptions={categoriesOptions} />

      <div className="mt-8">
        <DataTable
          columns={productsColumns} data={productsData}
          columnVisibility={{ productId: false,productVariants:false }}
        />
      </div>
    </div>
  );
};

export default ProductsView;
