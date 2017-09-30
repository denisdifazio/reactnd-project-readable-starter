import { combineReducers } from "redux";
import * as types from "../actions_types/index";
import { routerReducer } from "react-router-redux";
import {
  compareByScore,
  compareByNewest,
  compareByOldest
} from "../utils/SortHelper";

const drawerInitialState = {
  open: false
};

const categoriesDataInitialState = {
  isFetching: false,
  categories: [{ name: "top", path: "top" }]
};

const postsDataInitialState = {
  isFetching: true,
  sortType: "score",
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
    case types.SORT_POSTS:
      let orderedPosts = [];
      switch (action.sortType) {
        case "score":
          orderedPosts = state.posts.sort(compareByScore);
          break;
        case "newest":
          orderedPosts = state.posts.sort(compareByNewest);
          break;
        case "oldest":
          orderedPosts = state.posts.sort(compareByOldest);
          break;
        default:
          orderedPosts = state.posts;
      }
      return {
        ...state,
        sortType: action.sortType,
        posts: orderedPosts
      };

    case types.SET_POSTS:
      return {
        ...state,
        isFetching: false,
        posts: action.posts
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

    case types.ADD_COMMENT_RESPONSE:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.comment.parentId
              ? {
                  ...post,
                  comments: [...post.comments, action.comment]
                }
              : post
        )
      };

    case types.ADD_POST_RESPONSE:
      return {
        ...state,
        posts: [...state.posts, action.post]
      };

    case types.EDIT_POST_RESPONSE:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.post.id
              ? {
                  ...action.post
                }
              : post
        )
      };

    case types.EDIT_COMMENT_RESPONSE:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.comment.parentId
              ? {
                  ...post,
                  comments: post.comments.map(
                    comment =>
                      comment.id === action.comment.id
                        ? {
                            ...action.comment
                          }
                        : comment
                  )
                }
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
