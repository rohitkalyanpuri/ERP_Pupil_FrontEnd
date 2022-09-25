import { createAsyncThunk } from "@reduxjs/toolkit";
import { AlertProps } from "../../types/types";
// action
import { showHideAlert } from "./reducer";

export const alertAction = (props: AlertProps) => async (dispatch: any) => {
  dispatch(showHideAlert(props));
};
