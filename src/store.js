import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";
import { productsReducer } from "./reducers/productReducers";

//create redux store
const initialState = {};

//send product data to dev extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cart : cartReducer ,
    order : orderReducer ,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
