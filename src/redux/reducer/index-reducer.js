import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";

const appReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
