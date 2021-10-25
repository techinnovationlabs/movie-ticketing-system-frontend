import { axiosRootInstance } from "../../config/axios-config";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTO_LOGIN_SUCCESS,
    AUTO_LOGIN_FAIL,
    CLEAR_AUTH_MSG,
    REQ_START,
} from "./action-types";

export const login = (username, password) => async (dispatch) => {
    dispatch({ type: REQ_START });
    await axiosRootInstance
        .post("login", {
            username,
            password,
        })
        .then((res) => {
            localStorage.setItem("access_token", res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: res.data.user },
            });
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    errorMessage: err.response?.data?.message,
                },
            });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("access_token");
    dispatch({
        type: LOGOUT,
        payload: { message: "you are logged out successfully" },
    });
};

export const autoLogin = () => async (dispatch) => {

    await axiosRootInstance
        .get("users/me")
        .then((res) => {
            localStorage.setItem("access_token", res.data.token);
            dispatch({
                type: AUTO_LOGIN_SUCCESS,
                payload: { user: res.data.user },
            });
        })
        .catch((err) => {
            localStorage.removeItem("access_token");
            dispatch({
                type: AUTO_LOGIN_FAIL,
                payload: {
                    errorMessage: err.response?.data?.message,
                },
            });
        });
};

export const clearAuthError = () => (dispatch) => {
    dispatch({
        type: CLEAR_AUTH_MSG,
    });
};

export const clearAuthentication = (message) => (dispatch) => {
    localStorage.removeItem("access_token");
    dispatch({
        type: LOGOUT,
        payload: { message: message },
    });
};
