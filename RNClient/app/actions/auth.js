//Action auth
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, OAUTHLOGIN_SUCCESS } from "./types";

import AuthService from "../services/authService";


export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const logout = () => async(dispatch) => {
  await AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const oauthLogin = (token, role, name) => async(dispatch) => {
  const data = await AuthService.oauthlogin(token, role, name);
  console.log(data);
  dispatch({
    type: OAUTHLOGIN_SUCCESS,
    payload: { user: data },
  });
  //TODO: Can introduce a verification call in Authservice and handle error or unwanted access
};
  