import { setUnsetLoading } from "./reducer";
export const setUnsetLoadingAction =
  (status: boolean) => async (dispatch: any) => {
    dispatch(setUnsetLoading(status));
  };
