import { axiosRootInstance } from "../../config/axios-config";
import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAIL,
    FETCH_MOVIES_START,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_FAIL

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

export const fetchMovieById = (id) => async (
    dispatch
) => {
    dispatch({
        type: FETCH_MOVIES_START,
    });
    await axiosRootInstance
        .get(`movies/${id}`)
        .then((res) => {
            dispatch({
                type: FETCH_MOVIE_SUCCESS,
                payload: {
                    movie: res.data,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_MOVIE_FAIL,
                payload: { fetchErrorMessage: err.response?.data },
            });
        });
};
