import { combineReducers } from "redux";
import { responsiveStateReducer } from "redux-responsive";
import * as types from "../actions_types/index";

const drawerInitialState = {
  open: true,
  width: 250
};

const drawer = (state = drawerInitialState, action) => {
  switch (action.type) {
    case types.TOGGLE_DRAWER:
      return {
        ...state,
        open: action.open
      };

    default:
      return state;
  }
};

export default combineReducers({
  browser: responsiveStateReducer,
  drawer
});
