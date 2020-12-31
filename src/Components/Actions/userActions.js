import axios from "axios";
import {
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from "../Constants/userConstants";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../Constants/userConstants";

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

export const userRegisterAction = (name,email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });

  try {
      const {data} = await axios.post('/api/users/register', {name, email, password});
      dispatch({type: USER_REGISTER_SUCCESS, payload: data});
      dispatch({type: USER_SIGN_IN_SUCCESS, payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userSignOutActions = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({
        type: USER_SIGN_OUT
    })
}
