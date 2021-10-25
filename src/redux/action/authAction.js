import axios from "axios";
import { AUTH, AUTH_ERROR } from "../../helpers/constant";

// User Login
export const login = (res) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.API_URL}/auth`);
    axios.interceptors.request.use(
      (request) => {
        request.headers["Authorization"] = res.data.token;
      },
      (error) => Promise.reject(error)
    );
    dispatch({
      type: AUTH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
