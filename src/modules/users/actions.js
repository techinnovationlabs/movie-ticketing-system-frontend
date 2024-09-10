import { axiosRootInstance } from "../../config/axios-config";
import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    FETCH_USERS_START,
} from "./action-types";

export const fetchUsers = () => async (
    dispatch
) => {
    dispatch({
        type: FETCH_USERS_START,
    });
    await axiosRootInstance
        .get("users")
        .then((res) => {
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: {
                    users: res.data,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_USERS_FAIL,
                payload: { fetchErrorMessage: err.response?.data },
            });
        });
};
