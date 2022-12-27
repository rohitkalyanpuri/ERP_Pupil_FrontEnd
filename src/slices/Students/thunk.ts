import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudentProps, ApiResponseProps } from "../../types/types";
import { StudentApi, ExportExcelApi } from "../pupilApi";
import axios from "axios";
import * as fileSaver from "file-saver";
import {
  getStudents,
  addStudent,
  editStudent,
  deleteStudent,
  setUnsetLoader,
} from "./reducer";
import { showHideAlert } from "../Alert/reducer";
// action
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getStudentList = () => async (dispatch: any) => {
  dispatch(setUnsetLoader(true));
  try {
    let response: ApiResponseProps = await axios.get(StudentApi.Get, config);
    if (response.status == 0) {
      response.data =
        Object.keys(response.data[0]).length === 0 ? null : response.data;
      dispatch(getStudents(response.data));
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

export const createStudent =
  (Student: StudentProps) => async (dispatch: any) => {
    try {
      const body = JSON.stringify(Student);
      let response: ApiResponseProps = await axios.post(
        StudentApi.Add,
        body,
        config
      );
      if (response.status == 0) {
        dispatch(addStudent(response.data));
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

export const updateStudent =
  (Student: StudentProps) => async (dispatch: any) => {
    try {
      const body = JSON.stringify(Student);
      let response: ApiResponseProps = await axios.put(
        StudentApi.Edit,
        body,
        config
      );
      if (response.status == 0) {
        dispatch(editStudent(response.data));
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

export const removeStudent = (id: number) => async (dispatch: any) => {
  try {
    let response: ApiResponseProps = await axios.delete(
      StudentApi.Delete + `${id}`,
      config
    );

    if (response.status == 1) {
      dispatch(deleteStudent(id));
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

export const GetSampleApiUrl = () => async (dispatch: any) => {
  try {
    let response: ApiResponseProps = await axios.get(
      ExportExcelApi.Student,
      config
    );
    if (response.status == 0) {
      const link = document.createElement("a");
      link.href = response.message !== null ? response.message : "";
      link.setAttribute("download", "file.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
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
    // dispatch(apiError(error));
    dispatch(
      showHideAlert({
        showHide: true,
        color: "danger",
        message: "Error.",
      })
    );
  }
};
