import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParentProps } from "../../types/types";
import axios from "axios";
// action
import {
  apiError,
  getParents,
  addParent,
  editParent,
  deleteParent,
  setUnsetLoader,
} from "./reducer";
import { showHideAlert } from "../Alert/reducer";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const getParentList = () => async (dispatch: any) => {
  dispatch(setUnsetLoader(true));
  try {
    let response: ParentProps = await axios.get(
      "api/Parent/Getparentslist",
      config
    );
    dispatch(getParents(response));
    dispatch(setUnsetLoader(false));
    return response;
  } catch (error) {
    dispatch(apiError(error));
    dispatch(setUnsetLoader(false));
  }
};

export const createParent = (parent: ParentProps) => async (dispatch: any) => {
  try {
    const body = JSON.stringify(parent);
    let response: ParentProps = await axios.post(
      "/api/Parent/Addparent",
      body,
      config
    );
    dispatch(addParent(response));
    dispatch(
      showHideAlert({
        showHide: true,
        color: "success",
        message: "Parent added successfully!",
      })
    );
  } catch (error) {
    return error;
  }
};

export const updateParent = (parent: ParentProps) => async (dispatch: any) => {
  try {
    const body = JSON.stringify(parent);
    let response: ParentProps = await axios.put(
      "/api/Parent/Editparent",
      body,
      config
    );
    dispatch(editParent(response));
    dispatch(
      showHideAlert({
        showHide: true,
        color: "success",
        message: "Parent updated successfully!",
      })
    );
  } catch (error) {
    return error;
  }
};

export const removeParent = (id: number) => async (dispatch: any) => {
  try {
    let response = await axios.delete(`/api/Parent/Deleteparent/${id}`, config);
    dispatch(deleteParent(id));
    dispatch(
      showHideAlert({
        showHide: true,
        color: "success",
        message: "Parent deleted successfully!",
      })
    );
  } catch (error) {
    dispatch(
      showHideAlert({
        showHide: true,
        color: "danger",
        message: "System Error!",
      })
    );
  }
};
