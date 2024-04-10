import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { Product } from "../../types/Product";

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
  searchQuery: string;
  filters: {
    minPrice: number | null;
    maxPrice: number | null;
    categories: string[];
  };
  minPriceRange: number;
  maxPriceRange: number;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
  page: 1,
  limit: 100,
  totalProducts: 0,
  totalPages: 0,
  searchQuery: "",
  filters: {
    minPrice: null,
    maxPrice: null,
    categories: [],
  },
  minPriceRange: 0,
  maxPriceRange: 0,
};

interface FetchProductsPayload {
  page?: number;
  limit?: number;
}

export const fetchProductsAsync = createAsyncThunk("products/fetchProducts", async ({ page, limit }: FetchProductsPayload, { getState }) => {
  try {
    const { products } = getState() as { products: ProductsState };
    const { filters, searchQuery } = products;
    const { minPrice, maxPrice, categories } = filters;

    let url = `${process.env.REACT_APP_API_URL}/api/products`;
    const params: any = {};

    if (searchQuery) {
      url = `${process.env.REACT_APP_API_URL}/api/products/search`;
      params.query = searchQuery;
    } else {
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (minPrice !== null) params.min = minPrice;
      if (maxPrice !== null) params.max = maxPrice;
      if (categories.length > 0) params.categories = categories;
    }

    const response = await axios.get(url, { params });
    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setMinPrice: (state, action: PayloadAction<number | null>) => {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.filters.maxPrice = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.filters.categories = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const categoryIndex = state.filters.categories.indexOf(category);
      if (categoryIndex !== -1) {
        state.filters.categories = state.filters.categories.filter((item) => item !== category);
      } else {
        state.filters.categories.push(category);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        const { products, currentPage, totalPages, totalProducts, minPrice, maxPrice } = action.payload;

        state.products = products;
        state.status = "succeeded";
        state.page = currentPage;
        state.totalPages = totalPages;
        state.totalProducts = totalProducts;
        state.minPriceRange = minPrice;
        state.maxPriceRange = maxPrice;
      });
  },
});

export const { setMinPrice, setMaxPrice, setCategories, setSearchQuery, toggleCategory } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectPage = (state: RootState) => state.products.page;
export const selectLimit = (state: RootState) => state.products.limit;
export const selectTotalProducts = (state: RootState) => state.products.totalProducts;
export const selectTotalPages = (state: RootState) => state.products.totalPages;
export const selectSearchQuery = (state: RootState) => state.products.searchQuery;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectMinPrice = (state: RootState) => state.products.filters.minPrice;
export const selectMaxPrice = (state: RootState) => state.products.filters.maxPrice;
export const selectCategories = (state: RootState) => state.products.filters.categories;
export const selectMinPriceRange = (state: RootState) => state.products.minPriceRange;
export const selectMaxPriceRange = (state: RootState) => state.products.maxPriceRange;
export const selectProductsLength = (state: RootState) => state.products.products.length;
export const selectProductById = (productId: string) => (state: RootState) => state.products.products.find((product) => product.Id === productId);
export const selectProductsByManufacturer = (productId: string) => (state: RootState) => {
  const product = state.products.products.find((product) => product.Id === productId);
  if (!product) return [];
  const manufacturerName = product.Manufacturer;
  return state.products.products.filter((product) => product.Manufacturer === manufacturerName);
};

export default productsSlice.reducer;
