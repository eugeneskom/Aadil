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
  },
});

// Export the actions and selectors
export const { setWishlist } = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist.items;

export default wishlistSlice.reducer;