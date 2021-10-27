import {
  FETCH_SCREENS,
  FETCH_SCREENS_ERROR,
  CREATE_SCREEN,
  CREATE_SCREEN_ERROR,
  EDIT_SCREEN_ERROR,
  EDIT_SCREEN,
  SELECTED_SCREEN,
} from "../../helpers/constant";

const initialState = {
  screens: [],
  loading: true,
  errorMsg: null,
  selected: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SCREENS:
      return {
        ...state,
        screens: payload,
        loading: false,
        errorMsg: null,
      };

    case FETCH_SCREENS_ERROR:
      return {
        ...state,
        screens: [],
        loading: false,
        errorMsg: "Something went wrong!",
      };

    case SELECTED_SCREEN:
      return {
        ...state,
        selected: payload,
      };

    case CREATE_SCREEN:
      return {
        ...state,
        screens: [...state.screens, payload],
      };

    case CREATE_SCREEN_ERROR:
      return {
        ...state,
        errorMsg: "Something went wrong!",
      };
    case EDIT_SCREEN:
      return {
        ...state,
        screens: state.screens.map((scr) =>
          scr._id === payload._id ? payload : scr
        ),
      };

    case EDIT_SCREEN_ERROR:
      return {
        ...state,
        errorMsg: "Something went wrong!",
      };
    default:
      return state;
  }
}
