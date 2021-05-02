//Action register
import { REGISTER_SUCCESS, REGISTER_FAIL, VERIFY_SENT, VERIFIY_FAIL } from "./types";

import RegisterService from "../services/registerService";

export const register = (userData) => (dispatch) => {
  return RegisterService.register(userData).then(
    (data) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { email: userData.email },
      });
    },
    (error) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const verifyMail = (email) => (dispatch) => {
  return RegisterService.verifyMail(email).then(
    (data) => {
      dispatch({
        type: VERIFY_SENT,
      });
    },
    (error) => {
      dispatch({
        type: VERIFIY_FAIL,
        payload: { error }, 
      });
    }
  );
};