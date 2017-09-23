import { combineReducers } from "redux";
import * as types from "../actions_types/index";
import { routerReducer } from "react-router-redux";

const drawerInitialState = {
  open: true
};

const contentInitialState = {
  isFetching: false,
  categories: [{ name: "top", path: "top" }],
  posts: []
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
    case types.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case types.SET_CATEGORIES:
      return {
        ...state,
        categories: [{ name: "top", path: "top" }].concat(action.categories),
        isFetching: false
      };

    case types.SET_POSTS:
      return {
        ...state,
        posts: action.posts,
        isFetching: false
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
