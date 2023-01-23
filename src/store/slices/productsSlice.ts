import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const PRODUCTS_URL = "https://reqres.in/api/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get(PRODUCTS_URL);
    return data.data;
  }
);

interface Item {
  id: number;
  name: string;
  year: number;
  color: string;
}

interface InitialProductsState {
  items: Item[];
  error: string | null | undefined;
  loading: boolean;
}

const initialState: InitialProductsState = {
  items: [],
  error: null,
  loading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const selectProductsState = (state: RootState) => state.products;

export default productsSlice.reducer;
