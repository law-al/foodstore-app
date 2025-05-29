import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// to persist data from local storage
const getCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    return JSON.parse(storedCart);
  } else {
    return { products: [] };
  }
};

const setCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productId, userId, guestId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, userId, guestId, quantity }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartProduct = createAsyncThunk(
  "cart/updateCartProduct",
  async ({ productId, userId, guestId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, userId, guestId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "deleteCartProduct",
  async ({ productId, userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: { productId, userId, guestId },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const mergeProduct = createAsyncThunk(
  "cart/mergeProduct",
  async ({ guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cart: getCartFromStorage(),
  loading: false,
  error: null,
  success: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      // state.totalPrice: 0,
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.success = action.payload.success;
        console.log(state.cart, state.success);
        setCartToStorage(action.payload.cart);
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = action.payload.success;
        console.log(state.error);
      })

      .addCase(updateCartProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        setCartToStorage(action.payload.cart);
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(deleteCartProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        setCartToStorage(action.payload.cart);
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(mergeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(mergeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        setCartToStorage(action.payload.cart);
      })
      .addCase(mergeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
