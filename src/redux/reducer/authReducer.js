import { AUTH, AUTH_ERROR } from "../../helpers/constant";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: JSON.parse(localStorage.getItem("authUser")) ? true : null,
  user: JSON.parse(localStorage.getItem("authUser")),
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
