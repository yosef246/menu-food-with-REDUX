import { configureStore } from "@reduxjs/toolkit";
import CartContext from "./CartContext";
import UseProgressContext from "./UseProgressContext";

const store = configureStore({
  reducer: {
    cart: CartContext.reducer,
    userProgress: UseProgressContext.reducer,
  },
});

export default store;
