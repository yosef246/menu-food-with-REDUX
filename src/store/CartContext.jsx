import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updateItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        state.items[existingCartItemIndex] = updateItem;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );

      state.totalQuantity--;

      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItemIndex.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };

        state.items[existingCartItemIndex] = updatedItem;
      }
    },

    clearItem() {
      return { items: [], totalQuantity: 0 };
    },
  },
});

export const cartActions = CartSlice.actions;

export default CartSlice;
