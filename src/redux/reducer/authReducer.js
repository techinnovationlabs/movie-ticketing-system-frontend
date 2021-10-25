import { AUTH, AUTH_ERROR } from "../../helpers/constant";

const authUser = localStorage.getItem("authUser")
  ? JSON.parse(localStorage.getItem("authUser"))
  : null;
const authenticated = localStorage.getItem("authUser") ? true : false;
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: authenticated,
  user: authUser,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH:
      localStorage.setItem("authUser", JSON.stringify(payload.user));
      localStorage.setItem("token", JSON.stringify(payload.token));
      return {
        token: payload.token,
        isAuthenticated: true,
        user: payload.user,
      };
    case AUTH_ERROR:
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
