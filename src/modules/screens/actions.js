import { axiosRootInstance } from "../../config/axios-config";
import {
    FETCH_SCREENS_SUCCESS,
    FETCH_SCREENS_FAIL,
    FETCH_SCREENS_START,
    CREATE_SCREEN_SUCCESS,
    CREATE_SCREEN_FAIL
} from "./action-types";

export const fetchScreens = () => async (
    dispatch
) => {
    dispatch({
        type: FETCH_SCREENS_START,
    });
    await axiosRootInstance
        .get("screens")
        .then((res) => {
            dispatch({
                type: FETCH_SCREENS_SUCCESS,
                payload: {
                    screens: res.data,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_SCREENS_FAIL,
                payload: { fetchErrorMessage: err.response?.data },
            });
        });
};

export const createScreen = (values) => async (
    dispatch
) => {
    return await axiosRootInstance
        .post("screens", values)
        .then((res) => {
            dispatch({
                type: CREATE_SCREEN_SUCCESS,
                payload: { successMessage: "Screen Created Successfully" },

            });
            return { success: true };
        })
        .catch((err) => {
            dispatch({
                type: CREATE_SCREEN_FAIL,
                payload: { errorMessage: err.response?.data },
            });
            return { success: false };
        });
};

