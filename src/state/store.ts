import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../state/products/productsSlice";
import userRedducer from './user/userSlice'
import wishlistReducer from "./wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    user: userRedducer,
    wishlist: wishlistReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
