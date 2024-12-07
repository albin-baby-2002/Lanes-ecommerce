import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/admin/categories";
import products from "./slices/admin/products";
import users from "./slices/admin/users";

export const store = configureStore({
  reducer: {
    categories,
    products,
    users
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
