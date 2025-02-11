import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/admin/categories";
import products from "./slices/admin/products";
import users from "./slices/admin/users";
import orders from "./slices/admin/orders";

export const store = configureStore({
  reducer: {
    categories,
    products,
    users,
    orders,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
