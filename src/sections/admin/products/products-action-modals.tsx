"use client";
import React, { useEffect } from "react";
import AddOrEditProductModal from "./add-edit-product-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { productsReducers } from "@/store/slices/admin/products";
import { TCategoryOptions, TProductsData } from "./views/products-view";

//--------------------------------------------------------------------------------------------------------

interface TProps {
  categoryOptions: TCategoryOptions[];
  productsData: TProductsData[];
}

//--------------------------------------------------------------------------------------------------------

const ProductActionsModals = (props: TProps) => {
  // redux states and hooks

  const dispatch = useDispatch<AppDispatch>();

  const { showAddProduct, productToEdit, showEditProduct } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(
      productsReducers.setCategoryOptions(props.categoryOptions || null),
    );
  }, [props.categoryOptions, dispatch]);

  //--------------------------------------------------------------------------------------------------------

  return (
    <>
      <AddOrEditProductModal
        type="add"
        open={showAddProduct}
        toggleClose={() => {
          dispatch(productsReducers.toggleShowAddProduct());
        }}
      />

      <AddOrEditProductModal
        type="edit"
        open={showEditProduct}
        toggleClose={() => {
          dispatch(productsReducers.toggleShowEditProduct());
        }}
        productToEdit={ props.productsData.find((product)=>product.productId === productToEdit)}
      />
    </>
  );
};

export default ProductActionsModals;
