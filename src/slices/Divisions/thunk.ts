import { createAsyncThunk } from "@reduxjs/toolkit";
import { DivisionProps, ApiResponseProps } from "../../types/types";
import { DivisionApi } from "../pupilApi";
import axios from "axios";
import {
  getDivisions,
  addDivision,
  editDivision,
  deleteDivision,
  setUnsetLoader,
} from "./reducer";
import { showHideAlert } from "../Alert/reducer";
// action
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getDivisionList = () => async (dispatch: any) => {
  dispatch(setUnsetLoader(true));
  try {
    let response: ApiResponseProps = await axios.get(DivisionApi.Get, config);
    if (response.status == 0) {
      response.data =
        Object.keys(response.data[0]).length === 0 ? null : response.data;
      dispatch(getDivisions(response.data));
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
    dispatch(setUnsetLoader(false));
  }
};

export const createDivision =
  (Division: DivisionProps) => async (dispatch: any) => {
    try {
      const body = JSON.stringify(Division);
      let response: ApiResponseProps = await axios.post(
        DivisionApi.Add,
        body,
        config
      );
      if (response.status == 0) {
        dispatch(addDivision(response.data));
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

export const updateDivision =
  (Division: DivisionProps) => async (dispatch: any) => {
    try {
      const body = JSON.stringify(Division);
      let response: ApiResponseProps = await axios.put(
        DivisionApi.Edit,
        body,
        config
      );
      if (response.status == 0) {
        dispatch(editDivision(response.data));
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

export const removeDivision = (id: number) => async (dispatch: any) => {
  try {
    let response: ApiResponseProps = await axios.delete(
      DivisionApi.Delete + `${id}`,
      config
    );

    if (response.status == 1) {
      dispatch(deleteDivision(id));
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
