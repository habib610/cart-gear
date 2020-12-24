import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { detailsReducers, productReducers } from "../Reducers/productReducers";

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||  compose;

 const reducer = combineReducers({
     productList: productReducers,
     productDetails: detailsReducers
 })
 const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

 export default store;