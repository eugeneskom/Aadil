import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types/Product';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const fetchGroupedProducts = createAsyncThunk(
  'groupedProducts/fetchGroupedProducts',
  async () => {
    const response = await axios.get(`${API_URL}/api/products/grouped`);
    return response.data.data;
  }
);

interface GroupedProductsState {
  featuredProducts: Product[];
  categorizedProducts: any;
  isLoading: boolean;
  error: string | null;
}

const initialState : GroupedProductsState = {
  featuredProducts: [],
  categorizedProducts: {},
  isLoading: false,
  error: null,
};

const groupedProductsSlice = createSlice({
  name: 'groupedProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroupedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.featuredProducts = action.payload.featuredProducts;
        state.categorizedProducts = Object.fromEntries(
          Object.entries(action.payload).filter(([key]) => key !== 'featuredProducts')
        );
      })
      // .addCase(fetchGroupedProducts.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.error ? action.error.message || 'An error occurred' : null;
      // });
  },
});

export default groupedProductsSlice.reducer;