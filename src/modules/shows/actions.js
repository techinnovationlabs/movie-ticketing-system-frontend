import { axiosRootInstance } from "../../config/axios-config";
import {
    FETCH_SHOWS_SUCCESS,
    FETCH_SHOWS_FAIL,
    FETCH_SHOWS_START,
    CREATE_SHOW_SUCCESS,
    CREATE_SHOW_FAIL
} from "./action-types";

export const fetchShows = () => async (
    dispatch
) => {
    dispatch({
        type: FETCH_SHOWS_START,
    });
    await axiosRootInstance
        .get("shows")
        .then((res) => {
            dispatch({
                type: FETCH_SHOWS_SUCCESS,
                payload: {
                    shows: res.data,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_SHOWS_FAIL,
                payload: { fetchErrorMessage: err.response?.data },
            });
        });
};
export const fetchShowsByDateAndMovie = (date, movieId) => async (
    dispatch
) => {
    dispatch({
        type: FETCH_SHOWS_START,
    });
    await axiosRootInstance
        .get(`shows?movieId=${movieId}&date=${date}`)
        .then((res) => {
            dispatch({
                type: FETCH_SHOWS_SUCCESS,
                payload: {
                    shows: res.data,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_SHOWS_FAIL,
                payload: { fetchErrorMessage: err.response?.data },
            });
        });
};
export const createShow = (values) => async (
    dispatch
) => {
    return await axiosRootInstance
        .post("shows", values)
        .then((res) => {
            dispatch({
                type: CREATE_SHOW_SUCCESS,
                payload: { successMessage: "Show Created Successfully" },

            });
            return { success: true };
        })
        .catch((err) => {
            dispatch({
                type: CREATE_SHOW_FAIL,
                payload: { errorMessage: err.response?.data },
            });
            return { success: false };
        });
};

