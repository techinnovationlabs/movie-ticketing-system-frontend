import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    AUTO_LOGIN_SUCCESS,
    AUTO_LOGIN_FAIL,
    CLEAR_AUTH_MSG,
    REQ_START,
} from "./action-types";

const initialState = {
    loading: false,
    isAuthenticated: false,
    account: null,
    errorMessage: null,
    sessionHasBeenFetched: false,
    logout: false,
};

const authentication = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REQ_START:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                errorMessage: null,
                account: payload.user,
                logout: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                errorMessage: payload.errorMessage,
                account: null,
                logout: false,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                redirectMessage: payload.message,
                account: null,
                logout: true,
            };
        case AUTO_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                isAuthenticated: true,
                account: payload.user,
                sessionHasBeenFetched: true
            };
        case AUTO_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                account: null,
                sessionHasBeenFetched: true,
            };
        case CLEAR_AUTH_MSG:
            return {
                ...state,
                errorMessage: null,
            };
        default:
            return state;
    }
};

export default authentication;
