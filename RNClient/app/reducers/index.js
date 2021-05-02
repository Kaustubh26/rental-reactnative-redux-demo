import { combineReducers } from "redux";
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";
import apartmentReducer from "./apartmentReducer";
import userReducer from "./userReducer";

export default combineReducers({ auth: authReducer, register: registerReducer, apartment: apartmentReducer , user: userReducer});