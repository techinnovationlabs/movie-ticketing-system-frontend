import {
    FETCH_SHOWS_SUCCESS,
    FETCH_SHOWS_FAIL,
    FETCH_SHOWS_START,
    CLEAR_SHOW_FETCH_ERROR_MSG,
    CREATE_SHOW_FAIL,
    CREATE_SHOW_SUCCESS,
    CLEAR_SHOW_MSG
} from "./action-types";

const initialState = {
    loading: false,
    shows: [],
    successMessage: null,
    fetchErrorMessage: null,
    errorMessage: null
};

const showManagement = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_SHOWS_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_SHOWS_SUCCESS:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: null,
                shows: payload.shows,
            };
        case FETCH_SHOWS_FAIL:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: payload.fetchErrorMessage,
                shows: null,
            };
        case CREATE_SHOW_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                successMessage: payload.successMessage,
            };
        case CREATE_SHOW_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: payload.errorMessage,
                successMessage: null,
            };
        case CLEAR_SHOW_MSG:
            return {
                ...state,
                errorMessage: null,
                successMessage: null,
            };
        case CLEAR_SHOW_FETCH_ERROR_MSG:
            return {
                ...state,
                fetchErrorMessage: null,
            };
        default:
            return state;
    }
};

export default showManagement;
