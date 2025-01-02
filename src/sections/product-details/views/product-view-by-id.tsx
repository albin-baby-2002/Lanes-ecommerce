import React from "react";
import BreadCrumb from "@/components/breadcrumb";
import ProductImgInfo from "../product-img-info";
import AllReviews from "../all-reviews";
import SimilarProducts from "../similar-products";
import { getProductVariantDetails } from "@/lib/db-services/products";

const ProductViewById = async ({ id }: { id: string }) => {
  const variantDetails = await getProductVariantDetails(id);

  return (
    <div>
      <BreadCrumb routes={["Home", "Search", "T-shirts"]} />

      <ProductImgInfo variantDetails={variantDetails} />

      <AllReviews />

      <SimilarProducts />
    </div>
  );
};

export default ProductViewById;
