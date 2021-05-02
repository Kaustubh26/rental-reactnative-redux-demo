//Action users
import { GETUS_SUCCESS, GETUS_FAIL, ADDUS_SUCCESS, ADDUS_FAIL, UPDATEUS_SUCCESS, UPDATEUS_FAIL, DELETEUS_SUCCESS, DELETEUS_FAIL} from "./types";

import UserService from "../services/userService";

export const getUser = (token) => (dispatch) => {
  return UserService.getusers(token).then(
    (data) => {
      dispatch({
        type: GETUS_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      dispatch({
        type: GETUS_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const addUser = (userData, token) => (dispatch) => {
  return UserService.adduser(userData, token).then(
    (data) => {
      dispatch({
        type: ADDUS_SUCCESS,
        payload: { email: userData.email },
      });
    },
    (error) => {
      dispatch({
        type: ADDUS_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const updateUser = (userData, token) => (dispatch) => {
  return UserService.updateuser(userData, token).then(
    (data) => {
      dispatch({
        type: UPDATEUS_SUCCESS,
        payload: { user: userData },
      });
    },
    (error) => {
      dispatch({
        type: UPDATEUS_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const deleteUser = (userId, token) => (dispatch) => {
  return UserService.deleteuser(userId, token).then(
    (data) => {
      dispatch({
        type: DELETEUS_SUCCESS,
      });
    },
    (error) => {
      dispatch({
        type: DELETEUS_FAIL,
        payload: { error }, 
      });
    }
  );
};

