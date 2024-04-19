import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// Define the initial state
const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

// Define an async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
      return response.data.categories; // Assuming the response is an object with categoryCounts property
    } catch (error) {
      throw error;
    }
  }
);

// Define the categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
      });
  },
});

// Export the action creators and reducer
export const { } = categoriesSlice.actions;
export const selectCategories = (state:RootState) => state.categories.categories;
export const selectCategoriesStatus = (state:RootState) => state.categories.status;
export const selectCategoriesError = (state:RootState) => state.categories.error;

export default categoriesSlice.reducer;
