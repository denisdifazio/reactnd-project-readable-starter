import * as types from "../actions_types/index";

export function toggleDrawer(open) {
  return {
    type: types.TOGGLE_DRAWER,
    open
  };
}

export function setCategory(category) {
  return {
    type: types.SET_CATEGORY,
    category
  };
}
