//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {AuthProps} from "../../../types/types";
import axios from "axios";
// action
import {
    apiError, 
    loginSuccess
} from "./reducer";

import {
    postFakeLogin,
    postJwtLogin,
    postSocialLogin,
} from "../../../helpers/fakebackend_helper";

export const loginUser = (user: AuthProps, history: any) => async (dispatch: any) => {
    const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
    const body = JSON.stringify(user);
    try {
        
        let response:AuthProps = await axios.post("/api/auth", body, config);
        console.log(response);
        // const data:any = await response;

        if (response.isAuthenticated) {
            localStorage.setItem("authUser", JSON.stringify(response));
            dispatch(loginSuccess(response));
            history.push("/sales");
        }else
        dispatch(apiError(response.message));
    } catch (error) {
        dispatch(apiError(error));
    }
};

export const socialLogin = (data: any, history: any, type: any) => async (dispatch: any) => {
    try {
        let response;
        
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {

            let fireBaseBackend = getFirebaseBackend();

            response = fireBaseBackend.socialLoginUser(
                data,
                type
            );

        } else {
            response = postSocialLogin(data);
        }

        const socialdata = await response;

        if (socialdata) {
            localStorage.setItem("authUser", JSON.stringify(socialdata));
            dispatch(loginSuccess(socialdata));
            history.push("/sales");
        }

    } catch (error) {
        dispatch(apiError(error));
    }
};

export const logoutUser = (history: any) => async (dispatch: any) => {
    try {
        localStorage.removeItem("authUser");

        history.push("/login");
    } catch (error) {
        dispatch(apiError(error));
    }
};