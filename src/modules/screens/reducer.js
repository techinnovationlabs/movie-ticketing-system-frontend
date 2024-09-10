import {
    FETCH_SCREENS_SUCCESS,
    FETCH_SCREENS_FAIL,
    FETCH_SCREENS_START,
    CLEAR_SCREEN_FETCH_ERROR_MSG,
    CREATE_SCREEN_FAIL,
    CREATE_SCREEN_SUCCESS
} from "./action-types";

const initialState = {
    loading: false,
    screens: [],
    successMessage: null,
    fetchErrorMessage: null,
    errorMessage: null
};

const screenManagement = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_SCREENS_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_SCREENS_SUCCESS:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: null,
                screens: payload.screens,
            };
        case FETCH_SCREENS_FAIL:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: payload.fetchErrorMessage,
                screens: null,
            };
        case CREATE_SCREEN_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                successMessage: payload.successMessage,
            };
        case CREATE_SCREEN_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: payload.errorMessage,
                successMessage: null,
            };
        case CLEAR_SCREEN_FETCH_ERROR_MSG:
            return {
                ...state,
                fetchErrorMessage: null,
            };
        default:
            return state;
    }
};

export default screenManagement;
