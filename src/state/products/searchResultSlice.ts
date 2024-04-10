import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

interface SearchState {
  searchResults: Product[];
}

const initialState: SearchState = {
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Product[]>) => {
      state.searchResults = action.payload;
    },

  },
});

export const { setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
