import axios from "axios";
import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  SELECTED_MOVIE,
  SELECTED_MOVIE_ERROR,
  REVIEW_SUBMIT_SUCCESS,
  REVIEW_SUBMIT_FAILURE,
} from "../../helpers/constant";

// User Login
export const fetchMovies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies`);
    if (res.data) {
      dispatch({
        type: FETCH_MOVIES,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_MOVIES_ERROR,
    });
  }
};

export const selectedMovie = (movie) => async (dispatch) => {
  if (movie) {
    dispatch({
      type: SELECTED_MOVIE,
      payload: movie,
    });
  } else {
    dispatch({
      type: SELECTED_MOVIE_ERROR,
    });
  }
};

export const submitReview = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/review`,
      body
    );
    if (res.data === "success") {
      dispatch({
        type: REVIEW_SUBMIT_SUCCESS,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: REVIEW_SUBMIT_FAILURE,
    });
  }
};
