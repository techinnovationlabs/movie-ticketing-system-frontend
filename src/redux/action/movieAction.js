import axios from "axios";
import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  SELECTED_MOVIE,
  SELECTED_MOVIE_ERROR,
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
