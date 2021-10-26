import { combineReducers } from "redux";

import authentication from "../../modules/auth/reducer";
import userManagement from "../../modules/users/reducer";
import movieManagement from "../../modules/movies/reducer";
import screenManagement from "../../modules/screens/reducer";

const rootReducer = combineReducers({
    authentication,
    userManagement,
    movieManagement,
    screenManagement
});
export default rootReducer;
