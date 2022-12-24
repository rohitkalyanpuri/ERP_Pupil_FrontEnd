import { createSlice } from "@reduxjs/toolkit";
import { AcademicProps } from "../../types/types";

interface AcademicStateType {
  academics: Array<AcademicProps>;
  academic: object;
  error?: string | object | null | undefined | unknown;
  history?: any;
  loading: boolean;
}

export const initialState: AcademicStateType = {
  academics: [],
  academic: {},
  error: "",
  history: "",
  loading: false,
};

const academicSlice = createSlice({
  name: "academic",
  initialState,
  reducers: {
    getAcademics(state, action) {
      state.academics = action.payload;
    },
    addAcademic(state, action) {
      state.academics = [action.payload, ...state.academics];
    },
    editAcademic(state, action) {
      return {
        ...state,
        academics: state.academics.map(p =>
          p.academicId === action.payload.academicId ? action.payload : p
        ),
      };
    },
    deleteAcademic(state, action) {
      return {
        ...state,
        academics: state.academics.filter(p => p.academicId !== action.payload),
      };
    },
    setUnsetLoader(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  getAcademics,
  addAcademic,
  editAcademic,
  deleteAcademic,
  setUnsetLoader,
} = academicSlice.actions;

export default academicSlice.reducer;
