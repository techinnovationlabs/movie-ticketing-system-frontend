import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import screenReducer from "./screenReducer";
import showReducer from "./showReducer";

const appReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  screen: screenReducer,
  show: showReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
