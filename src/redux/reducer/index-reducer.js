import { combineReducers } from "redux";
import authReducer from "./authReducer";

const appReducer = combineReducers({
  auth: authReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
