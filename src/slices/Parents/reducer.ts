import { createSlice } from "@reduxjs/toolkit";
import { ParentProps } from "../../types/types";

interface ParentStateType {
  parents: Array<ParentProps>;
  parentProfile: object;
  error?: string | object | null | undefined | unknown;
  history?: any;
  loading:boolean
}

export const initialState: ParentStateType = {
  parents: [],
  parentProfile: {},
  error: "",
  history: "",
  loading:false
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    getParents(state, action) {
      state.parents = action.payload;
    },
    addParent(state, action) {
      state.parents = [action.payload, ...state.parents];
    },
    editParent(state, action) {
      return {
        ...state,
        parents: state.parents.map(p =>
          p.parentId === action.payload.parentId ? action.payload : p
        ),
      };
    },
    deleteParent(state, action) {
      return {
        ...state,
        parents: state.parents.filter(p => p.parentId !== action.payload),
      };
    },
    setUnsetLoader(state,action){
      state.loading=action.payload
    }
  },
});

export const {  getParents, addParent, editParent, deleteParent,setUnsetLoader } =
  parentSlice.actions;

export default parentSlice.reducer;
