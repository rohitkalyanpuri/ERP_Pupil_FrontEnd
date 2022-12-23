import { createSlice } from "@reduxjs/toolkit";
import { DivisionProps } from "../../types/types";

interface DivisionStateType {
  divisions: Array<DivisionProps>;
  division: object;
  error?: string | object | null | undefined | unknown;
  history?: any;
  loading: boolean;
}

export const initialState: DivisionStateType = {
  divisions: [],
  division: {},
  error: "",
  history: "",
  loading: false,
};

const divisionSlice = createSlice({
  name: "division",
  initialState,
  reducers: {
    getDivisions(state, action) {
      state.divisions = action.payload;
    },
    addDivision(state, action) {
      state.divisions = [action.payload, ...state.divisions];
    },
    editDivision(state, action) {
      return {
        ...state,
        divisions: state.divisions.map(p =>
          p.divisionId === action.payload.divisionId ? action.payload : p
        ),
      };
    },
    deleteDivision(state, action) {
      return {
        ...state,
        divisions: state.divisions.filter(p => p.divisionId !== action.payload),
      };
    },
    setUnsetLoader(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  getDivisions,
  addDivision,
  editDivision,
  deleteDivision,
  setUnsetLoader,
} = divisionSlice.actions;

export default divisionSlice.reducer;
