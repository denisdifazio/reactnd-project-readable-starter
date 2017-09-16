import { createStore, compose } from "redux";
import { responsiveStoreEnhancer } from "redux-responsive";
import reducers from "../reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(responsiveStoreEnhancer));

export default store;
