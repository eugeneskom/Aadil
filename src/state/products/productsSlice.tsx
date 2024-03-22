import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchProducts } from '../../api/fetchProducts'; // Import your API function
import { Product } from '../../types/Product';
import axios from 'axios';

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  limit: number;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  page: 1, // Initial page value
  limit: 100, // Initial limit value
};


interface FetchProductsPayload {
  page: number;
  limit: number;
}

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit }: FetchProductsPayload) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/products?page=${page}&limit=${limit}`);
      console.log('response',response.data)
      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }
      return response.data.products;
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
        state.status = 'succeeded';
        state.products = state.products.concat(action.payload);
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
export const selectProductById = (productId: string) => (state: RootState) =>
  state.products.products.find((product) => product.Id === productId);


export default productsSlice.reducer;