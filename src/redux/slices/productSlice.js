import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsByFilter = createAsyncThunk(
  "products/getAllProducts",
  async ({ category, sort, page, search }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      if (category) query.append("category", category);
      if (sort) query.append("sort", sort);
      if (page) query.append("page", page);
      if (search) query.append("search", search);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
      );

      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

export const bestSeller = createAsyncThunk(
  "products/bestSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/`
      );

      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

export const trending = createAsyncThunk(
  "products/trending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/`
      );

      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  bestSeller: [],
  trending: [],
  totalItems: 0,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getProductsByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.totalItems = 0;
      })

      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(bestSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bestSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSeller = action.payload;
      })
      .addCase(bestSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(trending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trending.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(trending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
