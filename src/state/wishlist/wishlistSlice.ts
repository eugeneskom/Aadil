import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";

// Define the state interface
interface WishlistState {
  items: string[];
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: WishlistState = {
  items: [],
  products: [],
  loading: false,
  error: null,
};

// Create the async thunk for fetching wishlist products
export const fetchWishlistProducts = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>(
  "wishlist/fetchProducts",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.products;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data as string);
    }
  }
);

// Create the async thunk for toggling a product in the wishlist
export const toggleWishlistAsync = createAsyncThunk<
  void,
  { productId: string; token: string },
  { rejectValue: string }
>(
  "wishlist/toggleProduct",
  async ({ productId, token }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/wishlist/toggle`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data.success) {
        dispatch(toggleWishlist(productId));
      }

      console.log("toggleWishlist", response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data as string);
    }
  }
);

// Create the wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
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
      }
    },
    emptyWishlist: (state) => {
      state.products = [];
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.items = action.payload.map((product) => product.Id);
      })
      .addCase(fetchWishlistProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleWishlistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlistAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the actions and selectors
export const { toggleWishlist, emptyWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistProducts = (state: RootState) => state.wishlist.products;
export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;

export default wishlistSlice.reducer;


// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import { Product } from "../../types/Product";
// import axios, { AxiosError } from "axios";

// // Define the state interface
// interface WishlistState {
//   items: string[];
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// // Define the initial state
// const initialState: WishlistState = {
//   items: [],
//   products: [],
//   loading: false,
//   error: null,
// };

// // Create the async thunk for fetching wishlist products
// export const fetchWishlistProducts = createAsyncThunk<
//   Product[],
//   string,
//   { rejectValue: string }
// >(
//   "wishlist/fetchProducts",
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wishlist`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data.products;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       return rejectWithValue(axiosError.response?.data as string);
//     }
//   }
// );

// // Create the wishlist slice
// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     toggleWishlist: (state, action: PayloadAction<string>) => {
//       const productId = action.payload;
//       const index = state.items.indexOf(productId);
//       if (index !== -1) {
//         // Remove the product ID from the wishlist if it exists
//         state.items.splice(index, 1);
//         state.products = state.products.filter((product) => product.Id !== productId);
//       } else {
//         // Add the product ID to the wishlist if it doesn't exist
//         state.items.push(productId);
//       }
//     },
//     emptyWishlist: (state) => {
//       state.products = [];
//       state.items = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlistProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWishlistProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
//         state.loading = false;
//         state.products = action.payload;
//         state.items = action.payload.map((product) => product.Id);
//       })
//       .addCase(fetchWishlistProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // Export the actions and selectors
// export const { toggleWishlist,emptyWishlist } = wishlistSlice.actions;

// export const selectWishlistItems = (state: RootState) => state.wishlist.items;
// export const selectWishlistProducts = (state: RootState) => state.wishlist.products;
// export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
// export const selectWishlistError = (state: RootState) => state.wishlist.error;

// export default wishlistSlice.reducer;