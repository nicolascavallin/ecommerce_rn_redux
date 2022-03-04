import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Product, ProductCart } from "./types";

export interface CartState {
  products: ProductCart[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(x => x.id === action.payload.id);

      if (index > -1) {
        // The product is in the cart
        const currentProduct = state.products[index];
        state.products.splice(index, 1, {
          ...currentProduct,
          quantity: currentProduct.quantity + 1,
        });
      } else {
        // The product is not in the cart
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    decrement: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(x => x.id === action.payload.id);

      if (index > -1) {
        const currentProduct = state.products[index];

        if (currentProduct.quantity > 1) {
          state.products.splice(index, 1, {
            ...currentProduct,
            quantity: currentProduct.quantity - 1,
          });
        } else {
          // The product should be removed
          state.products.splice(index, 1);
        }
      }
    },
    reset: state => {
      state.products = [];
    },
  },
});

export const { increment, decrement, reset } = cartSlice.actions;

export const cartSelector = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
