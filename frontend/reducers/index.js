import { combineReducers } from "redux";
import global from "./globalReducer";
import application from "./applicationReducer";
export default combineReducers({
  global,
  application,
});
