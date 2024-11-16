import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TIntialState {
  showAddProduct: boolean;
  categoryOptions: TCategoryOption[] | null;
}

export interface TCategoryOption {
  label: string;
  value: string;
}

const initialState: TIntialState = {
  showAddProduct: false,
  categoryOptions: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    toggleShowAddProduct: (state) => {
      state.showAddProduct = !state.showAddProduct;
    },

    setCategoryOptions: (
      state,
      action: PayloadAction<TCategoryOption[] | null>,
    ) => {
      state.categoryOptions = action.payload;
    },
  },
});

export const productsReducers = productSlice.actions;

export default productSlice.reducer;
