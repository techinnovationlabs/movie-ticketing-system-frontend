import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import screenReducer from "./screenReducer";

const appReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  screen: screenReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
