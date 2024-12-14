import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TIntialState {
  showAddProduct: boolean;
  categoryOptions: TCategoryOption[] | null;
  showEditProduct: boolean;
  productToEdit: string | null;
  showDeleteProductConfirmation: boolean;
  productToDelete: string | null;
  pendingDeleting: boolean;
}

export interface TCategoryOption {
  label: string;
  value: string;
}

const initialState: TIntialState = {
  showAddProduct: false,
  categoryOptions: null,
  showEditProduct: false,
  productToEdit: null,
  showDeleteProductConfirmation: false,
  productToDelete: null,
  pendingDeleting: false,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    toggleShowAddProduct: (state) => {
      state.showAddProduct = !state.showAddProduct;
    },

    setShowAddProduct: (state, action: PayloadAction<boolean>) => {
      state.showAddProduct = action.payload;
    },

    setShowEditProduct: (state, action: PayloadAction<boolean>) => {
      state.showEditProduct = action.payload;
    },

    toggleShowEditProduct: (state) => {
      state.showEditProduct = !state.showEditProduct;
    },

    togglePendingDeleting: (state) => {
      state.pendingDeleting = !state.pendingDeleting;
    },

    setCategoryOptions: (
      state,
      action: PayloadAction<TCategoryOption[] | null>,
    ) => {
      state.categoryOptions = action.payload;
    },

    setProductToEdit: (state, action: PayloadAction<string | null>) => {
      state.productToEdit = action.payload;
    },

    toggleDeleteProductConfirmation: (state) => {
      console.log("toggled", state.showDeleteProductConfirmation);
      state.showDeleteProductConfirmation =
        !state.showDeleteProductConfirmation;
    },
    setProductToDelete: (state, action: PayloadAction<string | null>) => {
      state.productToDelete = action.payload;
    },
  },
});

export const productsReducers = productSlice.actions;

export default productSlice.reducer;
