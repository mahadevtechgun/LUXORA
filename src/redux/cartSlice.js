import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },

    addcart: (state, action) => {
      const product = action.payload;

      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        exists.quantity += Number(product.quantity || 1);
      } else {
        state.items.push({
          ...product,
          quantity: Number(product.quantity || 1),
        });
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addcart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },

//   reducers: {
//     addcart: (state, action) => {
//       const product = action.payload;

//       const exists = state.items.find(
//         (item) => item.id === product.id
//       );

//       if (exists) {
//         // remove if already exists (toggle behavior)
//         state.items = state.items.filter(
//           (item) => item.id !== product.id
//         );
//       } else {
//         // add if not exists
//         state.items.push(product);
//       }
//     },
//   },
// });

// export const { addcart } = cartSlice.actions;
// export default cartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },

//   reducers: {
//     addcart: (state, action) => {
//       const product = action.payload;

//       const exists = state.items.find(
//         (item) => item.id === product.id
//       );

//       if (!exists) {
//         state.items.push({
//           ...product,
//           quantity: 1, // 👈 IMPORTANT
//         });
//       }
//     },

//     removecart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.id !== action.payload
//       );
//     },

//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;

//       const item = state.items.find((i) => i.id === id);

//       if (item) {
//         item.quantity = quantity;
//       }
//     },
//   },
// });

// export const { addcart, removecart, updateQuantity } =
//   cartSlice.actions;

// export default cartSlice.reducer;