import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  REFRESH_REVIEW,
  REVIEW_SUBMIT_FAILURE,
  REVIEW_SUBMIT_SUCCESS,
  SELECTED_MOVIE,
  SELECTED_MOVIE_ERROR,
} from "../../helpers/constant";

const initialState = {
  movies: [],
  loading: true,
  errorMsg: null,
  selected: {},
  reviewPosted: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: payload,
        loading: false,
        errorMsg: null,
      };

    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        movies: [],
        loading: false,
        errorMsg: "Something went wrong!",
      };

    case SELECTED_MOVIE:
      return {
        ...state,
        selected: payload,
      };

    case SELECTED_MOVIE_ERROR:
      return {
        ...state,
        selected: {},
      };

    case REVIEW_SUBMIT_SUCCESS:
      return {
        ...state,
        reviewPosted: true,
      };

    case REVIEW_SUBMIT_FAILURE:
      return {
        ...state,
        reviewPosted: false,
        errorMsg: "Something went wrong. Review not submitted.",
      };

    case REFRESH_REVIEW:
      return {
        ...state,
        reviewPosted: null,
      };
    default:
      return state;
  }
}
