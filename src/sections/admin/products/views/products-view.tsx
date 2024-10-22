import React from "react";
import SearchAndActions from "../search-and-actions";

const ProductsView = () => {
  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Products</p>
      </div>
      <SearchAndActions />
    </div>
  );
};

export default ProductsView;
