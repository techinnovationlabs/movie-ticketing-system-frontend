import { combineReducers } from "redux";

import authentication from "../../modules/auth/reducer";
import userManagement from "../../modules/users/reducer";

const rootReducer = combineReducers({
    authentication,
    userManagement
});
export default rootReducer;
