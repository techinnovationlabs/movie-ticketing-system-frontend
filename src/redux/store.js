import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const defaultMiddlewares = [thunkMiddleware];

const composedMiddlewares = (middlewares) =>
    compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState, middlewares = []) =>
    createStore(
        reducer,
        initialState,
        process.env.NODE_ENV === "development"		//devtools visible only for development environment
            ? composeWithDevTools(composedMiddlewares(middlewares))
            : composedMiddlewares(middlewares)
    );

export default initialize;
