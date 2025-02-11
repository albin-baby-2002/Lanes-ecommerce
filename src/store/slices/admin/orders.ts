
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TInitialState {
  showEditOrder: boolean;
  orderToEdit: null | string;
}

const initialState: TInitialState = {
  showEditOrder: false,
  orderToEdit: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    toggleShowEditOrder: (state) => {
      state.showEditOrder = !state.showEditOrder;
    },
    setOrderToEdit: (state, action: PayloadAction<string | null>) => {
      state.orderToEdit = action.payload;
    },
  },
});

export const ordersReducers = ordersSlice.actions;
export default ordersSlice.reducer;