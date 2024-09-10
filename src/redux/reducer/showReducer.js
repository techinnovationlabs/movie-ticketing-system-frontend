import {
  FETCH_SHOWS,
  FETCH_SHOWS_ERROR,
  CREATE_SHOW,
  CREATE_SHOW_ERROR,
  FETCH_TIMINGS,
} from "../../helpers/constant";

const initialState = {
  shows: [],
  showTimings: [],
  loading: true,
  errorMsg: null,
  selected: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SHOWS:
      return {
        ...state,
        shows: payload,
        loading: false,
        errorMsg: null,
      };
    case FETCH_TIMINGS:
      return {
        ...state,
        showTimings: payload,
      };
    case FETCH_SHOWS_ERROR:
      return {
        ...state,
        shows: [],
        loading: false,
        errorMsg: "Something went wrong!",
      };

    case CREATE_SHOW:
      return {
        ...state,
        shows: [...state.shows, payload],
      };

    case CREATE_SHOW_ERROR:
      return {
        ...state,
        errorMsg: "Something went wrong!",
      };

    default:
      return state;
  }
}
