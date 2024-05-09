import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

interface ProductPreviewState {
  product: Product | null;
  isOpen: boolean;
}

const initialState: ProductPreviewState = {
  product: null,
  isOpen: false,
};

const productPreviewSlice = createSlice({
  name: "productPreview",
  initialState,
  reducers: {
    openProductPreview: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      state.isOpen = true;
    },
    closeProductPreview: (state) => {
      state.product = null;
      state.isOpen = false;
    },
  },
});

export const { openProductPreview, closeProductPreview } = productPreviewSlice.actions;
export default productPreviewSlice.reducer;