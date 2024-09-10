import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    CLEAR_USER_FETCH_ERROR_MSG,
    FETCH_USERS_START,
} from "./action-types";

const initialState = {
    loading: false,
    users: [],
    successMessage: null,
    fetchErrorMessage: null,
};

const userManagement = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_USERS_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: null,
                users: payload.users,
            };
        case FETCH_USERS_FAIL:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: payload.fetchErrorMessage,
                users: null,
            };
        case CLEAR_USER_FETCH_ERROR_MSG:
            return {
                ...state,
                fetchErrorMessage: null,
            };
        default:
            return state;
    }
};

export default userManagement;
