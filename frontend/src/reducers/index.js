import { combineReducers } from "redux";
import * as types from "../actions_types/index";
import { routerReducer } from "react-router-redux";

const drawerInitialState = {
  open: true,
  width: 250
};

const contentInitialState = {
  categories: ["top"]
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

const content = (state = contentInitialState, action) => {
  switch (action.type) {
    case types.SET_CATEGORY:
      return {
        ...state,
        category: action.category
      };

    default:
      return state;
  }
};

export default combineReducers({
  router: routerReducer,
  drawer,
  content
});
