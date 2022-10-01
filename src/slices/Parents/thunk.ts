import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParentProps, ApiResponseProps } from "../../types/types";
import { ParentApi } from "../pupilApi";
import axios from "axios";
import {
  getParents,
  addParent,
  editParent,
  deleteParent,
  setUnsetLoader,
} from "./reducer";
import { showHideAlert } from "../Alert/reducer";

// action
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const getParentList = () => async (dispatch: any) => {
  dispatch(setUnsetLoader(true));
  try {
    let response: ApiResponseProps = await axios.get(ParentApi.Get, config);
    if (response.status == 0) {
      response.data = Object.keys(response.data[0]).length === 0 ?null  : response.data;
      dispatch(getParents(response.data));
    } else {
      dispatch(
        showHideAlert({
          showHide: true,
          color: "danger",
          message: response.message,
        })
      );
    }
    dispatch(setUnsetLoader(false));
    return response;
  } catch (error) {
    // dispatch(apiError(error));
    dispatch(setUnsetLoader(false));
  }
};

export const createParent = (parent: ParentProps) => async (dispatch: any) => {
  try {
    const body = JSON.stringify(parent);
    let response: ApiResponseProps = await axios.post(
      ParentApi.Add,
      body,
      config
    );
    if (response.status == 0) {
      dispatch(addParent(response.data));
      dispatch(
        showHideAlert({
          showHide: true,
          color: "success",
          message: response.message,
        })
      );
    } else {
      dispatch(
        showHideAlert({
          showHide: true,
          color: "danger",
          message: response.message,
        })
      );
    }
  } catch (error) {
    return error;
  }
};

export const updateParent = (parent: ParentProps) => async (dispatch: any) => {
  try {
    const body = JSON.stringify(parent);
    let response: ApiResponseProps = await axios.put(
      ParentApi.Edit,
      body,
      config
    );
    if (response.status == 0) {
      dispatch(editParent(response.data));
      dispatch(
        showHideAlert({
          showHide: true,
          color: "success",
          message: response.message,
        })
      );
    } else {
      dispatch(
        showHideAlert({
          showHide: true,
          color: "danger",
          message: response.message,
        })
      );
    }
  } catch (error) {
    return error;
  }
};

export const removeParent = (id: number) => async (dispatch: any) => {
  try {
    let response: ApiResponseProps = await axios.delete(
      ParentApi.Delete + `${id}`,
      config
    );

    if (response.status == 1) {
      dispatch(deleteParent(id));
      dispatch(
        showHideAlert({
          showHide: true,
          color: "success",
          message: response.message,
        })
      );
    } else {
      dispatch(
        showHideAlert({
          showHide: true,
          color: "danger",
          message: response.message,
        })
      );
    }
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
