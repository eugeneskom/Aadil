import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

// Define the initial state
const initialState = {
  brands: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch brands from the API
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/brands`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create the brands slice
const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.brands;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// Export the async thunk and the selector to get brands from the store
export const getBrands = (state:RootState) => state.brands.brands;

export default brandsSlice.reducer;