import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../state/products/productsSlice";
import userRedducer from './user/userSlice'
import wishlistReducer from "./wishlist/wishlistSlice";
import authSlice from './token/tokenSlice'
import isValidtoken from './token/isValidToken'
import screenWidthReducer from "./screenWidthSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    user: userRedducer,
    wishlist: wishlistReducer,
    auth: authSlice,
    isValidToken:isValidtoken,
    screenWidth: screenWidthReducer
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
