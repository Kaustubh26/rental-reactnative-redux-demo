//Action apartments
import { GETAP_SUCCESS, GETAP_FAIL, ADDAP_SUCCESS, ADDAP_FAIL, UPDATEAP_SUCCESS, UPDATEAP_FAIL, DELETEAP_SUCCESS, DELETEAP_FAIL} from "./types";

import ApartmentService from "../services/apartmentService";

export const getApartment = (filterQuery, token) => (dispatch) => {
  return ApartmentService.getapartment(filterQuery, token).then(
    (data) => {
      dispatch({
        type: GETAP_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      dispatch({
        type: GETAP_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const addApartment = (apartmentData, token) => (dispatch) => {
  return ApartmentService.addapartment(apartmentData, token).then(
    (data) => {
      dispatch({
        type: ADDAP_SUCCESS,
        payload: { data },
      });
    },
    (error) => {
      dispatch({
        type: ADDAP_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const updateApartment = (apartmentData, token) => (dispatch) => {
  return ApartmentService.updateapartment(apartmentData, token).then(
    (data) => {
      dispatch({
        type: UPDATEAP_SUCCESS,
        payload: { data },
      });
    },
    (error) => {
      dispatch({
        type: UPDATEAP_FAIL,
        payload: { error }, 
      });
    }
  );
};

export const deleteApartment = (apartmentId, token) => (dispatch) => {
  return ApartmentService.deleteapartment(apartmentId, token).then(
    (data) => {
      dispatch({
        type: DELETEAP_SUCCESS,
      });
    },
    (error) => {
      dispatch({
        type: DELETEAP_FAIL,
        payload: { error }, 
      });
    }
  );
};