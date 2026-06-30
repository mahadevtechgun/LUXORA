import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    setWishlist: (state, action) => {
      state.items = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.find(
        (item) => item.id === product.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.items.push(product);
      }
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  setWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;