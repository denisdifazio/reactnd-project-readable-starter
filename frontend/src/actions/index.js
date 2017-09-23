import * as types from "../actions_types/index";
import * as ServerAPI from "../serverApi";

export function toggleDrawer(open) {
  return {
    type: types.TOGGLE_DRAWER,
    open
  };
}

export function fetchRequest() {
  return {
    type: types.FETCH_REQUEST,
    isFetching: true
  };
}

export function setCategories(categories) {
  return {
    type: types.SET_CATEGORIES,
    categories
  };
}

export const fetchCategories = () => dispatch =>
  ServerAPI.getCategories().then(categories =>
    dispatch(setCategories(categories))
  );

export function setPosts(posts) {
  return {
    type: types.SET_POSTS,
    posts
  };
}

export function votePost(post) {
  return {
    type: types.VOTE_POST,
    post
  };
}

export const fetchAllPosts = () => dispatch =>
  ServerAPI.getAllPosts().then(posts => dispatch(setPosts(posts)));

export const fetchVotePost = (id, vote) => dispatch =>
  ServerAPI.votePost(id, vote).then(post => dispatch(votePost(post)));
