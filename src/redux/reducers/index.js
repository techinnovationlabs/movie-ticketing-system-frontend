import { combineReducers } from "redux";

import authentication from "../../modules/auth/reducer";
import userManagement from "../../modules/users/reducer";
import movieManagement from "../../modules/movies/reducer";
import screenManagement from "../../modules/screens/reducer";
import showManagement from "../../modules/shows/reducer";
import slotManagement from "../../modules/slots/reducer";
const rootReducer = combineReducers({
    authentication,
    userManagement,
    movieManagement,
    screenManagement,
    showManagement,
    slotManagement
});
export default rootReducer;
