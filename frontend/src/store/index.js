import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers/index";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const history = createHistory();

const middleware = [routerMiddleware(history), thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
