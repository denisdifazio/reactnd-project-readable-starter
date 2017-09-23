import { combineReducers } from "redux";
import * as types from "../actions_types/index";
import { routerReducer } from "react-router-redux";

const drawerInitialState = {
  open: true
};

const categoriesDataInitialState = {
  isFetching: false,
  categories: [{ name: "top", path: "top" }]
};

const postsDataInitialState = {
  isFetching: true,
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

const postsData = (state = postsDataInitialState, action) => {
  switch (action.type) {
    case types.SET_POSTS:
      return {
        ...state,
        isFetching: false,
        posts: action.posts
      };

    case types.VOTE_POST_RESPONSE:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.post.id
              ? { ...post, voteScore: action.post.voteScore }
              : post
        )
      };

    case types.SET_POST_COMMENTS:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.id
              ? { ...post, comments: action.comments }
              : post
        )
      };

    default:
      return state;
  }
};

const categoriesData = (state = categoriesDataInitialState, action) => {
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

    default:
      return state;
  }
};

export default combineReducers({
  router: routerReducer,
  drawer,
  categoriesData,
  postsData
});
