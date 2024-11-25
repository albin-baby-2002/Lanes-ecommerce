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

export interface TCategoryOptions {
  label: string;
  value: string;
}

const ProductsView = async () => {
  const categoriesOptions = (await getAllCategoriesWithSpecificFields({
    label: categories.name,
    value: categories.categoryId,
  })) as unknown as TCategoryOptions[];

  const productsData = await db.execute(sql`
  SELECT
    products.productId,
    products.name,
    products.description,
    products.discount,
    products.onDiscount,
    ARRAY_AGG(DISTINCT categories.name) AS categories,
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'productVariantId', productVariants.productVariantId,
        'color', productVariants.color,
        'size', productVariants.size,
        'inventoryCount', productVariants.inventoryCount,
        'price', productVariants.price,
        'onSale', productVariants.onSale,
        'productVariantImages', ARRAY_AGG(productVariantImages.imgUrl)
      )
    ) AS productVariants
  FROM products
  INNER JOIN productVariants
    ON products.productId = productVariants.productId
  INNER JOIN productVariantImages
    ON productVariants.productVariantId = productVariantImages.productVariantId
  INNER JOIN productCategories
    ON products.productId = productCategories.productId
  INNER JOIN categories
    ON productCategories.categoryId = categories.categoryId
  GROUP BY products.productId
  ORDER BY products.productId;
`);

  // const productsData = await db
  //   .select()
  //   .from(products)
  //   .innerJoin(
  //     productVariants,
  //     eq(products.productId, productVariants.productId),
  //   )
  //   .innerJoin(
  //     productVariantImages,
  //     eq(
  //       productVariants.productVariantId,
  //       productVariantImages.productVariantId,
  //     ),
  //   )
  //   .innerJoin(
  //     productCategories,
  //     eq(products.productId, productCategories.productId),
  //   )
  //   .innerJoin(
  //     categories,
  //     eq(productCategories.categoryId, categories.categoryId),
  //   );

  console.log(productsData);

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Products</p>
      </div>

      <SearchAndActions />

      <ProductActionsModals categoryOptions={categoriesOptions} />

      {/* <div className="mt-8">
        <DataTable
          columns={productsColumns}
          data={productsData}
          columnVisibility={{ productId: false }}
        />
      </div> */}

    </div>
  );
};

export default ProductsView;
