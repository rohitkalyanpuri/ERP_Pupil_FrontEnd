import { createSlice } from "@reduxjs/toolkit";
import { AlertProps } from "../../types/types";

export const initialState: AlertProps = {
  showHide: false,
  color: "",
  message: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showHideAlert(state, action) {
      state.showHide = action.payload.showHide;
      state.color = action.payload.color;
      state.message = action.payload.message;
    },
  },
});

export const { showHideAlert } = alertSlice.actions;

export default alertSlice.reducer;
