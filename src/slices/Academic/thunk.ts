import { createAsyncThunk } from "@reduxjs/toolkit";
import { AcademicProps, ApiResponseProps } from "../../types/types";
import { AcademicApi } from "../pupilApi";
import axios from "axios";
import {
  getAcademics,
  addAcademic,
  editAcademic,
  deleteAcademic,
  setUnsetLoader,
} from "./reducer";
import { showHideAlert } from "../Alert/reducer";
// action
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAcademicList = () => async (dispatch: any) => {
  dispatch(setUnsetLoader(true));
  try {
    let response: ApiResponseProps = await axios.get(AcademicApi.Get, config);
    if (response.status == 0) {
      response.data =
        Object.keys(response.data[0]).length === 0 ? null : response.data;
      dispatch(getAcademics(response.data));
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

export const createAcademic =
  (Academic: AcademicProps) => async (dispatch: any) => {
    try {
      const body = JSON.stringify(Academic);
      let response: ApiResponseProps = await axios.post(
        AcademicApi.Add,
        body,
        config
      );
      if (response.status == 0) {
        dispatch(addAcademic(response.data));
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

export const updateAcademic =
  (Academic: AcademicProps) => async (dispatch: any) => {
    try {
      const body = JSON.stringify(Academic);
      let response: ApiResponseProps = await axios.put(
        AcademicApi.Edit,
        body,
        config
      );
      if (response.status == 0) {
        dispatch(editAcademic(response.data));
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

export const removeAcademic = (id: number) => async (dispatch: any) => {
  try {
    let response: ApiResponseProps = await axios.delete(
      AcademicApi.Delete + `${id}`,
      config
    );

    if (response.status == 1) {
      dispatch(deleteAcademic(id));
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
