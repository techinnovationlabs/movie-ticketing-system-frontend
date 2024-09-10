import axios from "axios";
import {
    SERVER_DOWN,
    SERVER_DOWN_MESSAGE,
    NETWORK_DOWN_MESSAGE,
    TIMEOUT_ERROR,
} from "../utils/constants";
import { message } from "antd";
const TIMEOUT = 30000;

export const axiosRootInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/`,
    timeout: TIMEOUT,
});

const setupAxiosInterceptors = (
    onUnauthenticated
) => {
    const key = SERVER_DOWN;
    const onRequestSuccess = async (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    };
    const onResponseSuccess = (response) => response;
    const onResponseError = (err) => {
        if (err.code === TIMEOUT_ERROR) {
            message.error({ content: SERVER_DOWN_MESSAGE, key, duration: 10 });
        }
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401) {
            onUnauthenticated(err.message);
        }
        if (status === 0) {
            if (!navigator.onLine) {
                message.error({
                    content: NETWORK_DOWN_MESSAGE,
                    key,
                    duration: 10,
                });
            }
        }
        return Promise.reject(err);
    };

    axiosRootInstance.interceptors.request.use(onRequestSuccess);
    axiosRootInstance.interceptors.response.use(
        onResponseSuccess,
        onResponseError
    );
};

export default setupAxiosInterceptors;
