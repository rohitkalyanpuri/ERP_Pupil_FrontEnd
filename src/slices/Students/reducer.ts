import { createSlice } from "@reduxjs/toolkit";
import { StudentProps } from "../../types/types";

interface StudentStateType {
  students: Array<StudentProps>;
  studentProfile: object;
  error?: string | object | null | undefined | unknown;
  history?: any;
  loading: boolean;
}

export const initialState: StudentStateType = {
  students: [],
  studentProfile: {},
  error: "",
  history: "",
  loading: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudents(state, action) {
      state.students = action.payload;
    },
    addStudent(state, action) {
      state.students = [action.payload, ...state.students];
    },
    editStudent(state, action) {
      return {
        ...state,
        students: state.students.map(p =>
          p.studentId === action.payload.studentId ? action.payload : p
        ),
      };
    },
    deleteStudent(state, action) {
      return {
        ...state,
        students: state.students.filter(p => p.studentId !== action.payload),
      };
    },
    setUnsetLoader(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  getStudents,
  addStudent,
  editStudent,
  deleteStudent,
  setUnsetLoader,
} = studentSlice.actions;

export default studentSlice.reducer;
