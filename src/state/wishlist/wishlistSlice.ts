import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the state interface
interface WishlistState {
  items: string[];
}

// Define the initial state
const initialState: WishlistState = {
  items: [],
};

// Create the wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index !== -1) {
        // Remove the product ID from the wishlist if it exists
        state.items.splice(index, 1);
      } else {
        // Add the product ID to the wishlist if it doesn't exist
        state.items.push(productId);
      }
    },
  },
});

// Export the actions and selectors
export const { setWishlist, toggleWishlist } = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist.items;

export default wishlistSlice.reducer;
