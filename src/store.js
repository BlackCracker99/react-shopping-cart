import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";

//create redux store
const initialState = {};

//send product data to dev extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
