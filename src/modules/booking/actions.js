import { axiosRootInstance } from "../../config/axios-config";
export const bookShow = async (values) => {
    return await axiosRootInstance
        .post("ticket-booking", values)
        .then((res) => {
            return { success: true };
        })
        .catch((err) => {
            return { success: false, errorMsg: err.response?.data };
        });
};
