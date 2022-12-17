import { createAsyncThunk } from "@reduxjs/toolkit";
import { GradeProps, ApiResponseProps } from "../../types/types";
import { GradeApi } from "../pupilApi";
import axios from "axios";
import {
  getGrades,
  addGrade,
  editGrade,
  deleteGrade,
  setUnsetLoader,
} from "./reducer";
import { showHideAlert } from "../Alert/reducer";
// action
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getGradeList = () => async (dispatch: any) => {
  dispatch(setUnsetLoader(true));
  try {
    let response: ApiResponseProps = await axios.get(GradeApi.Get, config);
    if (response.status == 0) {
      response.data =
        Object.keys(response.data[0]).length === 0 ? null : response.data;
      dispatch(getGrades(response.data));
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

export const createGrade = (Grade: GradeProps) => async (dispatch: any) => {
  try {
    const body = JSON.stringify(Grade);
    let response: ApiResponseProps = await axios.post(
      GradeApi.Add,
      body,
      config
    );
    if (response.status == 0) {
      dispatch(addGrade(response.data));
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

export const updateGrade = (Grade: GradeProps) => async (dispatch: any) => {
  try {
    const body = JSON.stringify(Grade);
    let response: ApiResponseProps = await axios.put(
      GradeApi.Edit,
      body,
      config
    );
    if (response.status == 0) {
      dispatch(editGrade(response.data));
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

export const removeGrade = (id: number) => async (dispatch: any) => {
  try {
    let response: ApiResponseProps = await axios.delete(
      GradeApi.Delete + `${id}`,
      config
    );

    if (response.status == 1) {
      dispatch(deleteGrade(id));
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
