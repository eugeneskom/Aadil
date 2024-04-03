import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { Product } from '../../types/Product';

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  limit: number;
  minPrice: number | null;
  maxPrice: number | null;
  totalProducts: number;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  page: 1, // Initial page value
  limit: 100, // Initial limit value
  minPrice: null,
  maxPrice: null,
  totalProducts: 0,
};

interface FetchProductsPayload {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
}

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit, minPrice, maxPrice }: FetchProductsPayload) => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/api/products`;

      if (minPrice !== undefined && maxPrice !== undefined) {
        url = `${process.env.REACT_APP_API_URL}/api/products/price-range`;
        url += `?min=${minPrice}&max=${maxPrice}`;
      } else {
        url += `?page=${page}&limit=${limit}`;
      }

      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        if (action.payload.page && action.payload.page === 1) {
          // If it's the first page, replace the products array
          state.products = action.payload.products;
        } else {
          // If it's a subsequent page or fetching by price range, replace the products array
          state.products = action.payload.products;
        }
        state.status = 'succeeded';
        state.page = action.payload.page || state.page;
        state.minPrice = action.payload.minPrice || null;
        state.maxPrice = action.payload.maxPrice || null;
        state.totalProducts = action.payload.totalProducts || 0;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const { incrementPage } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectPage = (state: RootState) => state.products.page;
export const selectMinPrice = (state: RootState) => state.products.minPrice;
export const selectMaxPrice = (state: RootState) => state.products.maxPrice;
export const selectTotalProducts = (state: RootState) => state.products.totalProducts;
export const selectProductById = (productId: string) => (state: RootState) =>
  state.products.products.find((product) => product.Id === productId);
export const selectProductsByManufacturer = (productId: string) => (state: RootState) => {
  const product = state.products.products.find((product) => product.Id === productId);
  if (!product) return [];
  const manufacturerName = product.Manufacturer;
  return state.products.products.filter((product) => product.Manufacturer === manufacturerName);
};

export default productsSlice.reducer;