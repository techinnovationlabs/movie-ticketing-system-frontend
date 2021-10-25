import { combineReducers } from "redux";

import authentication from "../../modules/auth/reducer";

const rootReducer = combineReducers({
    authentication
});
export default rootReducer;
