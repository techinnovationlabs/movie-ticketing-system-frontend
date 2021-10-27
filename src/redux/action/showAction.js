import axios from "axios";
import {
  FETCH_SHOWS,
  FETCH_SHOWS_ERROR,
  CREATE_SHOW,
  CREATE_SHOW_ERROR,
  FETCH_TIMINGS,
} from "../../helpers/constant";

export const fetchShows = () => async (dispatch) => {
  try {
    debugger;
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/show`);
    debugger;
    if (res.data) {
      dispatch({
        type: FETCH_SHOWS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_SHOWS_ERROR,
    });
  }
};

export const fetchTimings = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/show/timings`
    );
    debugger;
    if (res.data) {
      dispatch({
        type: FETCH_TIMINGS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_SHOWS_ERROR,
    });
  }
};

export const createShow = (body) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/show`, body);
    if (res.status === 200) {
      dispatch({
        type: CREATE_SHOW,
        payload: res.data,
      });
    } else {
      console.error(res.data);
      dispatch({
        type: CREATE_SHOW_ERROR,
        payload: res.data,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: CREATE_SHOW_ERROR,
    });
  }
};
