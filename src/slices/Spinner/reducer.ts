import { createSlice } from "@reduxjs/toolkit";

interface SpinnerStateType {
    loading:boolean
}

export const initialState: SpinnerStateType = {
    loading:false
  };

  const spinnerSlice = createSlice({
    name: "spinner",
    initialState,
    reducers: {
      setUnsetLoading(state, action) {
        state.loading = action.payload.loading;
      },
    },
  });
  
  export const { setUnsetLoading} =
  spinnerSlice.actions;
  
  export default spinnerSlice.reducer;