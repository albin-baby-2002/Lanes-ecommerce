import React from "react";
import BreadCrumb from "@/components/breadcrumb";
import ProductImgInfo from "../product-img-info";
import AllReviews from "../all-reviews";
import SimilarProducts from "../similar-products";
import { findAllReviewByProductVariantId, getProductVariantDetails } from "@/lib/db-services/products";

const ProductViewById = async ({ id }: { id: string }) => {
  const variantDetails = await getProductVariantDetails(id);
  const reviews = await findAllReviewByProductVariantId(id);

  return (
    <div className=" px-5 lg:px-0 w-screen">
      <BreadCrumb routes={["Home", "Search", "T-shirts"]} />

      <ProductImgInfo variantDetails={variantDetails} />

      <AllReviews variantId={variantDetails.productVariantId} reviews={reviews} />

      <SimilarProducts />
    </div>
  );
};

export default ProductViewById;
