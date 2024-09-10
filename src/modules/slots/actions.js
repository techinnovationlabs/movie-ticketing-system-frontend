import { axiosRootInstance } from "../../config/axios-config";
import {
    FETCH_SLOTS_SUCCESS,
    FETCH_SLOTS_FAIL,
} from "./action-types";

export const fetchSlots = () => async (
    dispatch
) => {
    await axiosRootInstance
        .get("slots")
        .then((res) => {
            dispatch({
                type: FETCH_SLOTS_SUCCESS,
                payload: {
                    slots: res.data,
                },
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_SLOTS_FAIL,
                payload: { fetchErrorMessage: err.response?.data },
            });
        });
};
