import { axiosRootInstance } from "../../config/axios-config";
import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAIL,
    FETCH_MOVIES_START,
} from "./action-types";

export const fetchMovies = () => async (
    dispatch
) => {
    dispatch({
        type: FETCH_MOVIES_START,
    });
    await axiosRootInstance
        .get("movies")
        .then((res) => {
            dispatch({
                type: FETCH_MOVIES_SUCCESS,
                payload: {
                    movies: res.data,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_MOVIES_FAIL,
                payload: { fetchErrorMessage: err.response?.data },
            });
        });
};
