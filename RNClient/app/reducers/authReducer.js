import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, OAUTHLOGIN_SUCCESS } from "../actions/types";

const user = AsyncStorage.getItem("user");

const initialState = user ? { isLoggedIn: true, user, loginErrorMsg: null } : { isLoggedIn: false, user: null, loginErrorMsg: null};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        loginErrorMsg: null,
      };
    case LOGIN_FAIL:
      let errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loginErrorMsg: errorMessage
      };
    case OAUTHLOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        loginErrorMsg: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loginErrorMsg: null,
      };
    default:
      return state;
  }
}