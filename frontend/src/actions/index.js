import * as types from "../actions_types/index";
import * as ServerAPI from "../serverApi";
import { push } from "react-router-redux";

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

export function setPostComments(id, comments) {
  return {
    type: types.SET_POST_COMMENTS,
    id,
    comments
  };
}

export function addCommentResponse(comment) {
  return {
    type: types.ADD_COMMENT_RESPONSE,
    comment
  };
}

export function addPostResponse(post) {
  return {
    type: types.ADD_POST_RESPONSE,
    post
  };
}

export function editPostResponse(post) {
  return {
    type: types.EDIT_POST_RESPONSE,
    post
  };
}

export function editCommentResponse(comment) {
  return {
    type: types.EDIT_COMMENT_RESPONSE,
    comment
  };
}

export const fetchPostComments = id => dispatch =>
  ServerAPI.getPostComments(id).then(comments =>
    dispatch(setPostComments(id, comments))
  );

export const fetchAllPosts = () => dispatch =>
  ServerAPI.getAllPosts()
    .then(posts => dispatch(setPosts(posts)))
    .then(action =>
      action.posts.map(post => dispatch(fetchPostComments(post.id)))
    );

export const fetchVotePost = (id, vote) => dispatch =>
  ServerAPI.votePost(id, vote).then(post => dispatch(editPostResponse(post)));

export const fetchVoteComment = (id, vote) => dispatch =>
  ServerAPI.voteComment(id, vote).then(comment =>
    dispatch(editCommentResponse(comment))
  );

export const fetchAddComment = comment => dispatch =>
  ServerAPI.addComment(comment).then(comment =>
    dispatch(addCommentResponse(comment))
  );

export const fetchAddPost = post => dispatch =>
  ServerAPI.addPost(post)
    .then(post => dispatch(addPostResponse(post)))
    .then(action => dispatch(push(`/${post.category}/${post.id}`)));

export const fetchEditPost = (id, post) => dispatch =>
  ServerAPI.editPost(id, post)
    .then(post => dispatch(editPostResponse(post)))
    .then(action =>
      dispatch(push(`/${action.post.category}/${action.post.id}`))
    );

export const fetchEditComment = (id, comment) => dispatch =>
  ServerAPI.editComment(id, comment).then(comment =>
    dispatch(editCommentResponse(comment))
  );

export const fetchDeletePost = id => dispatch =>
  ServerAPI.deletePost(id).then(post => dispatch(editPostResponse(post)));

export const fetchDeleteComment = id => dispatch =>
  ServerAPI.deleteComment(id).then(comment =>
    dispatch(editCommentResponse(comment))
  );
