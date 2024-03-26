import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../../api/fetchWishlist";

// Define the initial state for the wishlist
interface WishlistState {
  items: string[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// Define the async thunk for fetching the wishlist from the API
export const fetchWishlist = createAsyncThunk<string[], string>(
  "wishlist/fetchWishlist",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.getWishlist(email);
      return response.wishlist;
    } catch (error) {
      return rejectWithValue("Failed to retrieve wishlist");
    }
  }
);

// Define the async thunk for toggling a project ID in the wishlist
export const toggleProjectId = createAsyncThunk<
  string,
  { email: string; productId: string },
  { state: RootState; rejectValue: string }
>(
  "wishlist/toggleProjectId",
  async ({ email, productId }, { rejectWithValue }) => {
    try {
      await api.toggleProductInWishlist(email, productId);
      return productId;
    } catch (error) {
      return rejectWithValue("Failed to toggle product in wishlist");
    }
  }
);

// Create the wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch wishlist";
      })
      .addCase(toggleProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleProjectId.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const productId = action.payload;
        const index = state.items.findIndex((id) => id === productId);
        if (index !== -1) {
          // Remove the product ID from the wishlist
          state.items.splice(index, 1);
        } else {
          // Add the product ID to the wishlist
          state.items.push(productId);
        }
      })
      .addCase(toggleProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to toggle product ID";
      });
  },
});

// Export the actions and selectors
export const selectWishlist = (state: RootState) => state.wishlist.items;
export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;

export default wishlistSlice.reducer;