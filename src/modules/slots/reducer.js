import {
    FETCH_SLOTS_SUCCESS,
    FETCH_SLOTS_FAIL,
} from "./action-types";

const initialState = {
    slots: [],
    successMessage: null,
    fetchErrorMessage: null,
};

const slotManagement = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_SLOTS_SUCCESS:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: null,
                slots: payload.slots,
            };
        case FETCH_SLOTS_FAIL:
            return {
                ...state,
                loading: false,
                fetchErrorMessage: payload.fetchErrorMessage,
                slots: null,
            };
        default:
            return state;
    }
};

export default slotManagement;
