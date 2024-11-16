"use client";
import React, { useEffect } from "react";
import AddOrEditProductModal from "./add-edit-product-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { productsReducers } from "@/store/slices/admin/products";

const ProductActionsModals = ({
  categoryOptions,
}: {
  categoryOptions: { label: string; value: string }[];
}) => {
  // redux states and hooks
  const dispatch = useDispatch<AppDispatch>();

  const { showAddProduct } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(productsReducers.setCategoryOptions(categoryOptions || null));
  }, [categoryOptions]);

  return (
    <>
      <AddOrEditProductModal
        type="add"
        open={showAddProduct}
        toggleClose={() => {
          dispatch(productsReducers.toggleShowAddProduct());
        }}
      />
    </>
  );
};

export default ProductActionsModals;
