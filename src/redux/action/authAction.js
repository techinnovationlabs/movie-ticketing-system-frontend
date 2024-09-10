import axios from "axios";
import {
  AUTH,
  AUTH_ERROR,
  REGISTER,
  REGISTER_ERROR,
} from "../../helpers/constant";

// User Login
export const login =
  ({ data }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth`,
        data
      );
      if (res.data.token) {
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
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

export const register = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      body
    );
    if (res.data === "success") {
      dispatch({
        type: REGISTER,
      });
    } else {
      dispatch({
        type: REGISTER_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: REGISTER_ERROR,
    });
  }
};
