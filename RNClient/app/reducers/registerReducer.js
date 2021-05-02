//Register Reducer
import { REGISTER_SUCCESS, REGISTER_FAIL, VERIFY_SENT, VERIFIY_FAIL } from "../actions/types";

const initialState = {isRegistered: false, registerErrorMsg: null, registerEmail: null, verMailSent: false}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        registerErrorMsg: null,
        registerEmail: payload.email
      };
    case REGISTER_FAIL:
      let errorMessage = (payload.error ? payload.error.toString() : 'An error occured');
      return {
        ...state,
        isRegistered: false,
        registerErrorMsg: errorMessage,
        registerEmail: null
      };
    case VERIFY_SENT:
      return {
        ...state,
        verMailSent: true,
      };
    case VERIFIY_FAIL:
      return {
        ...state,
        verMailSent: false,
      };
    default:
      return state;
  }
}