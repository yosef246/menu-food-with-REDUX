import { createSlice } from "@reduxjs/toolkit";

const UserProgressSlice = createSlice({
  name: "userProgress",
  initialState: {
    progress: "",
  },
  reducers: {
    showCart(state) {
      state.progress = "cart";
    },
    HideCart(state) {
      state.progress = "";
    },
    showCheckOut(state) {
      state.progress = "checkout";
    },
    HideCheckOut(state) {
      state.progress = "";
    },
  },
});

export const userProgressActions = UserProgressSlice.actions;

export default UserProgressSlice;
