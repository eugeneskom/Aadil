import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../state/products/productsSlice';


export const store = configureStore({
  reducer: {
    products: productSlice,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;