import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

// Define the interface for the wishlist state
interface WishlistState {
  wishlist: Product[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<Product>) => {
      state.wishlist = state.wishlist.filter(item => item.Id !== action.payload.Id);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state: {wishlist: WishlistState}) => state.wishlist.wishlist;

export default wishlistSlice.reducer;
