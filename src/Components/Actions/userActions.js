import axios from "axios";
import {
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
} from "../Constants/userConostants";

export const userSingInAction = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_IN_REQUEST, payload: { email, password } });

  try {
      const {data} = await axios.post('/api/users/signin', {email, password});
      dispatch({type: USER_SIGN_IN_SUCCESS, payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
