import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducer/index-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, devTools);

export default store;
