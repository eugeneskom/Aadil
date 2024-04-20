import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../state/products/productsSlice";
import userRedducer from "./user/userSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
import authSlice from "./token/tokenSlice";
import isValidtoken from "./token/isValidToken";
import screenWidthReducer from "./screenWidthSlice";
import AuthPopupStateSlice from "./AuthPopupStateSlice";
import searchResultSlice from "./products/searchResultSlice";
import categoriesSlice from "./categories/categoriesSlice";
import groupedProductsSlice from "./products/groupedProductsSlice";
export const store = configureStore({
  reducer: {
    products: productSlice,
    user: userRedducer,
    wishlist: wishlistReducer,
    auth: authSlice,
    isValidToken: isValidtoken,
    screenWidth: screenWidthReducer,
    authPopupState: AuthPopupStateSlice,
    search: searchResultSlice,
    categories: categoriesSlice,
    groupedProducts: groupedProductsSlice,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
