import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/admin/categories";
import products from "./slices/admin/products";

export const store = configureStore({
  reducer: {
    categories,
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
