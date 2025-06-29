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
      response.data =
        Object.keys(response.data[0]).length === 0 ? null : response.data;
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

export const importParent =
  (parents: ParentProps[]) => async (dispatch: any) => {
    dispatch(setUnsetLoader(true));
    dispatch(
      showHideAlert({
        showHide: true,
        color: "info",
        message: "Importing... Please do not refresh/close the page",
      })
    );
    try {
      const body = JSON.stringify(parents);
      let response: ApiResponseProps = await axios.post(
        ParentApi.Import,
        body,
        config
      );
      dispatch(setUnsetLoader(false));
      if (response.status == 0) {
        dispatch(
          showHideAlert({
            showHide: true,
            color: "success",
            message: response.message,
          })
        );
      } else if (response.status == 3) {
        dispatch(
          showHideAlert({
            showHide: true,
            color: "info",
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
      return response.data;
    } catch (error) {
      dispatch(
        showHideAlert({
          showHide: true,
          color: "danger",
          message: "Bad request please check the file data.",
        })
      );
      dispatch(setUnsetLoader(false));
      return parents;
    }
  };
