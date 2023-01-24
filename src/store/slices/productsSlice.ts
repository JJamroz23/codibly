import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ProductsState {
  items: Product[];
  error: number | null | undefined;
  loading: boolean;
  searchId: number;
  page: number;
  total: number;
  perPage: number;
}

interface FetchProductsResponse {
  data: Product[] | Product;
  per_page: number;
  total_pages: number;
  total: number;
}

const PRODUCTS_URL = "https://reqres.in/api/products";

const getQueryParams = (state: ProductsState) => {
  const params = new URLSearchParams();
  params.append("per_page", String(state.perPage));
  params.append("page", String(state.page));
  if (state.searchId) params.append("id", String(state.searchId));
  return "?" + params.toString();
};

export const fetchProducts = createAsyncThunk<
  {
    total_pages: number;
    data: Product[];
  },
  void,
  {
    state: RootState;
    rejectValue: ProductsState["error"];
  }
>("products/fetchProducts", async (_, { getState, rejectWithValue }) => {
  try {
    const productsState = selectProductsState(getState());
    const { data } = await axios.get<FetchProductsResponse>(
      PRODUCTS_URL + getQueryParams(productsState)
    );

    return {
      data: Array.isArray(data.data) ? data.data : [data.data],
      total_pages: data.total_pages || 1,
    };
  } catch (error: any) {
    return rejectWithValue(
      error instanceof AxiosError ? error?.response?.status : 1
    );
  }
});

const getInitialValuesFromUrl = () => {
  const { search, pathname } = window.location;
  const params = new URLSearchParams(search);

  if (pathname !== "/") {
    return {
      page: 1,
      searchId: 0,
      perPage: 5,
    };
  }

  return {
    page: Number(params.get("page")) || 1,
    searchId: Number(params.get("searchId")) || 0,
    perPage: Number(params.get("perPage")) || 5,
  };
};

const initialState: ProductsState = {
  items: [],
  error: null,
  loading: false,
  total: 0,
  ...getInitialValuesFromUrl(),
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchId(state, action) {
      state.searchId = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.total = action.payload.total_pages;
      state.loading = false;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.items = [];
    });
  },
});

export const { setSearchId, setPage } = productsSlice.actions;

export const selectProductsState = (state: RootState) => state.products;
export const selectProductsSearchText = (state: RootState) =>
  state.products.searchId;
export const selectErrorState = (state: RootState) => state.products.error;

export default productsSlice.reducer;
