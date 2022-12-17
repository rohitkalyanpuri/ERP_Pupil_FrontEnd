import { createSlice } from "@reduxjs/toolkit";
import { GradeProps } from "../../types/types";

interface GradeStateType {
  grades: Array<GradeProps>;
  grade: object;
  error?: string | object | null | undefined | unknown;
  history?: any;
  loading: boolean;
}

export const initialState: GradeStateType = {
  grades: [],
  grade: {},
  error: "",
  history: "",
  loading: false,
};

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    getGrades(state, action) {
      state.grades = action.payload;
    },
    addGrade(state, action) {
      state.grades = [action.payload, ...state.grades];
    },
    editGrade(state, action) {
      return {
        ...state,
        grades: state.grades.map(p =>
          p.gradeId === action.payload.gradeId ? action.payload : p
        ),
      };
    },
    deleteGrade(state, action) {
      return {
        ...state,
        grades: state.grades.filter(p => p.gradeId !== action.payload),
      };
    },
    setUnsetLoader(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { getGrades, addGrade, editGrade, deleteGrade, setUnsetLoader } =
  gradeSlice.actions;

export default gradeSlice.reducer;
