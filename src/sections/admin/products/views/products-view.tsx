import React from "react";
import SearchAndActions from "../search-and-actions";
import { categories } from "@/drizzle/schema";
import { getAllCategoriesWithSpecificFields } from "@/lib/db-services/category";
import ProductActionsModals from "../products-action-modals";
import { DataTable } from "@/components/table/data-table";
import { productsColumns } from "../datatable-columns";
import { getProductsWithVariants, TProductsWithVariantsAndImages } from "@/lib/db-services/products";

export interface TCategoryOptions {
  label: string;
  value: string;
}
export interface TProductsData {
  productId: string;
  productInternalId: number;
  name: string;
  description: string;
  discount: number;
  onDiscount: boolean;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  productVariants: ProductVariant[];
}

export interface Category {
  categoryId: string;
  categoryInternalId: number;
}

export interface ProductVariant {
  productVariantId: string;
  color: string;
  size: string;
  inventoryCount: number;
  price: number;
  onSale: boolean;
  productVariantImages: string[];
}

const ProductsView = async () => {
  const categoriesOptions = (await getAllCategoriesWithSpecificFields({
    label: categories.name,
    value: categories.categoryId,
  })) as unknown as TCategoryOptions[];

  const productsData = await getProductsWithVariants();

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Products</p>
      </div>

      <SearchAndActions />

      <ProductActionsModals
        productsData={productsData}
        categoryOptions={categoriesOptions}
      />

      <div className="mt-8">
        <DataTable<TProductsWithVariantsAndImages>
          columns={productsColumns}
          data={productsData}
          columnVisibility={{
            productInternalId: false,
            productId: false,
            productVariants: false,
          }}
        />
      </div>
    </div>
  );
};

export default ProductsView;
