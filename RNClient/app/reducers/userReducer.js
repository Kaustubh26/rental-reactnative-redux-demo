//Apartment Reducer
import { GETUS_SUCCESS, GETUS_FAIL, ADDUS_SUCCESS, ADDUS_FAIL, UPDATEUS_SUCCESS, UPDATEUS_FAIL, DELETEUS_SUCCESS, DELETEUS_FAIL } from "../actions/types";

const initialState = { userList: [], getUsErrorMsg: null,isUsAdded: false, addUsErrorMsg: null, isUsUpdated: false, updateUsErrorMsg: null, isUsDeleted: false, deleteUsErrorMsg: null, addUsEmail: null}
let errorMessage;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETUS_SUCCESS:
      return {
        ...state,
        userList: payload,
        getUsErrorMsg: null,
      };
    case GETUS_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        userList: [],
        getUsErrorMsg: errorMessage,
      };
    case ADDUS_SUCCESS:
      return {
        ...state,
        addUsEmail: payload.email,
        isUsAdded: true,
        addUsErrorMsg: null,
      };
    case ADDUS_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        addUsEmail: null,
        isUsAdded: false,
        addUsErrorMsg: errorMessage,
      };
    case UPDATEUS_SUCCESS:
      return {
        ...state,
        isUsUpdated: true,
        updateUsErrorMsg: null,
      };
    case UPDATEUS_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        isUsUpdated: false,
        updateUsErrorMsg: errorMessage,
      };
    case DELETEUS_SUCCESS:
      return {
        ...state,
        isUsDeleted: true,
        deleteUsErrorMsg: null,
      };
    case DELETEUS_FAIL:
      errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        isUsDeleted: false,
        deleteUsErrorMsg: errorMessage,
      };
    default:
      return state;
  }
}