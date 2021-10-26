import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAIL,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_FAIL,
    FETCH_MOVIE_START,
    FETCH_MOVIES_START,
    CLEAR_MOVIE_FETCH_ERROR_MSG
} from "./action-types";

const initialState = {
    loading: false,
    movies: [],
    successMessage: null,
    fetchErrorMessage: null,
    selectedMovie: null,
};

const movieManagement = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_MOVIES_START || FETCH_MOVIE_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: null,
                movies: payload.movies,
            };
        case FETCH_MOVIES_FAIL:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: payload.fetchErrorMessage,
                movies: null,
            };
        case FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedMovie: payload.movie
            };
        case FETCH_MOVIE_FAIL:
            return {
                ...state,
                loading: false,
                selectedMovie: null
            };
        case CLEAR_MOVIE_FETCH_ERROR_MSG:
            return {
                ...state,
                fetchErrorMessage: null,
            };
        default:
            return state;
    }
};

export default movieManagement;
