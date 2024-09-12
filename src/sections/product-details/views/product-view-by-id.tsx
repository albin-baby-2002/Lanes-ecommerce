
import React from "react";
import BreadCrumb from "@/components/breadcrumb";
import ProductImgInfo from "../product-img-info";
import AllReviews from "../all-reviews";
import SimilarProducts from "../similar-products";

const ProductViewById = () => {

  return (
    <div>
      <BreadCrumb routes={["Home", "Search", "T-shirts"]} />

      <ProductImgInfo />

      <AllReviews />

      <SimilarProducts />
    </div>
  );
};

export default ProductViewById;
