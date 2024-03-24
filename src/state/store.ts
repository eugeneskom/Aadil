import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../state/products/productsSlice";
import wishlistSlice from "./wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    wishlist: wishlistSlice,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
