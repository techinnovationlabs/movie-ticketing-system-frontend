import axios from "axios";
import {
  CREATE_SCREEN,
  CREATE_SCREEN_ERROR,
  EDIT_SCREEN,
  EDIT_SCREEN_ERROR,
  FETCH_SCREENS,
  FETCH_SCREENS_ERROR,
} from "../../helpers/constant";
import { convertToScreenTableData } from "../../helpers/service";

// User Login
export const fetchScreens = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/screen`);
    if (res.data) {
      dispatch({
        type: FETCH_SCREENS,
        payload: convertToScreenTableData(res.data, "Array"),
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_SCREENS_ERROR,
    });
  }
};

export const createScreen = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/screen`,
      body
    );
    if (res.status === 200) {
      dispatch({
        type: CREATE_SCREEN,
        payload: convertToScreenTableData(res.data, "Object"),
      });
    } else {
      console.error(res.data);
      dispatch({
        type: CREATE_SCREEN_ERROR,
        payload: res.data,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: CREATE_SCREEN_ERROR,
    });
  }
};

export const editScreen = (body) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/screen`,
      body
    );
    if (res.status === 200) {
      dispatch({
        type: EDIT_SCREEN,
        payload: convertToScreenTableData(res.data, "Object"),
      });
    } else {
      console.error(res.data);
      dispatch({
        type: EDIT_SCREEN_ERROR,
        payload: res.data,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: EDIT_SCREEN_ERROR,
    });
  }
};
