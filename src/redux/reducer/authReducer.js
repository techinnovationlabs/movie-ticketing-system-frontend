import {
  AUTH,
  AUTH_ERROR,
  REGISTER,
  REGISTER_ERROR,
} from "../../helpers/constant";

const authUser = localStorage.getItem("authUser")
  ? JSON.parse(localStorage.getItem("authUser"))
  : null;
const authenticated = localStorage.getItem("authUser") ? true : false;
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: authenticated,
  user: authUser,
  loginSuccess: null,
  registerSuccess: null,
  loginErrorMsg: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH:
      localStorage.setItem("authenticated", true);
      localStorage.setItem("authUser", JSON.stringify(payload.user));
      localStorage.setItem("token", JSON.stringify(payload.token));
      return {
        token: payload.token,
        isAuthenticated: true,
        user: payload.user,
        loginSuccess: true,
      };

    case AUTH_ERROR:
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        user: null,
        loginSuccess: false,
        loginErrorMsg: payload.data ? payload.data : "Something went wrong",
      };

    case REGISTER:
      return {
        registerSuccess: true,
      };

    case REGISTER_ERROR:
      return {
        registerSuccess: false,
      };
    default:
      return state;
  }
}
