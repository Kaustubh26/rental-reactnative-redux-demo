//Apartment Reducer
import { GETAP_SUCCESS, GETAP_FAIL, ADDAP_SUCCESS, ADDAP_FAIL, UPDATEAP_SUCCESS, UPDATEAP_FAIL,  DELETEAP_SUCCESS, DELETEAP_FAIL } from "../actions/types";

const initialState = { apartmentList: [], getApErrorMsg: null,isApAdded: false, addApErrorMsg: null, isApUpdated: false, updateApErrorMsg: null, isApDeleted: false, deleteApErrorMsg: null,}
let errorMessage;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETAP_SUCCESS:
      return {
        ...state,
        apartmentList: payload,
        getApErrorMsg: null,
      };
    case GETAP_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        apartmentList: [],
        getApErrorMsg: errorMessage,
      };
    case ADDAP_SUCCESS:
      return {
        ...state,
        isApAdded: true,
        addApErrorMsg: null,
      };
    case ADDAP_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        isApAdded: false,
        addApErrorMsg: errorMessage,
      };
    case UPDATEAP_SUCCESS:
      return {
        ...state,
        isApUpdated: true,
        updateApErrorMsg: null,
      };
    case UPDATEAP_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        isApUpdated: false,
        updateApErrorMsg: errorMessage,
      };
    case DELETEAP_SUCCESS:
      return {
        ...state,
        isApDeleted: true,
        deleteApErrorMsg: null,
      };
    case DELETEAP_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        isApDeleted: false,
        deleteApErrorMsg: errorMessage,
      };
    default:
      return state;
  }
}