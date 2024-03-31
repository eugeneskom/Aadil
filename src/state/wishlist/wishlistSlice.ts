import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../../types/Product";

// Define the state interface
interface WishlistState {
  items: string[];
  products: Product[];
}

// Define the initial state
const initialState: WishlistState = {
  items: [],
  products: [],
};

// Create the wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.items = action.payload.map((product) => product.Id);
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index !== -1) {
        // Remove the product ID from the wishlist if it exists
        state.items.splice(index, 1);
        state.products = state.products.filter((product) => product.Id !== productId);
      } else {
        // Add the product ID to the wishlist if it doesn't exist
        state.items.push(productId);
        // You can fetch the updated wishlist products here if needed
      }
    },
  },
});

// Export the actions and selectors
export const { setWishlist, toggleWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistProducts = (state: RootState) => state.wishlist.products;

export default wishlistSlice.reducer;