import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../store/CartContext";
import UserProgressSlice from "../store/UseProgressContext";

const store = configureStore({
  reducer: {
    userProgress: UserProgressSlice.reducer,
    cart: CartSlice.reducer,
  },
});

export default store;
