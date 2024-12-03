"use client";
import React, { useEffect, useMemo } from "react";
import AddOrEditProductModal from "./add-edit-product-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { productsReducers } from "@/store/slices/admin/products";
import { TCategoryOptions, TProductsData } from "./views/products-view";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeleteProduct } from "@/lib/actions/admin/product-actions";

//--------------------------------------------------------------------------------------------------------

interface TProps {
  categoryOptions: TCategoryOptions[];
  productsData: TProductsData[];
}

//--------------------------------------------------------------------------------------------------------

const ProductActionsModals = (props: TProps) => {
  const router = useRouter();

  // redux states and hooks

  const dispatch = useDispatch<AppDispatch>();

  const {
    showAddProduct,
    productToEdit,
    pendingDeleting,
    showEditProduct,
    showDeleteProductConfirmation,
    productToDelete,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(
      productsReducers.setCategoryOptions(props.categoryOptions || null),
    );
  }, [props.categoryOptions, dispatch]);

  const productToDeleteData = useMemo(() => {
    return props.productsData.find((prd) => prd.productId === productToDelete);
  }, [props.productsData, productToDelete]);

  const closeDeleteConfirmation = () => {
    dispatch(productsReducers.toggleDeleteProductConfirmation());

    dispatch(productsReducers.setProductToDelete(null));
  };

  const handleDelete = async () => {
    dispatch(productsReducers.togglePendingDeleting());

    if (!productToDelete) return toast.error("Unexpected error try again");

    const resp = await DeleteProduct(productToDelete);

    if (resp.success) {
      toast.success("Successfully deleted the category");
      router.refresh();
      dispatch(productsReducers.togglePendingDeleting());
      return closeDeleteConfirmation();
    }

    toast.error(resp.message);
    dispatch(productsReducers.togglePendingDeleting());
  };
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
        productToEdit={props.productsData.find(
          (product) => product.productId === productToEdit,
        )}
      />

      <ConfirmationModal
        open={showDeleteProductConfirmation}
        title="Delete Product"
        description={
          <div>
            {`Are you sure you wanna delete the "${productToDeleteData?.name}"
            Product With Its Entire Variants ! `}
            `
            <span style={{ color: "black" }}>
              If you Want To Delete A Variant Edit Product Data
            </span>
          </div>
        }
        secondaryAction={closeDeleteConfirmation}
        secondaryActionLabel="Cancel"
        primaryAction={handleDelete}
        primaryActionLabel="Delete"
        primaryActionPending={pendingDeleting}
        color="error"
      />
    </>
  );
};

export default ProductActionsModals;
