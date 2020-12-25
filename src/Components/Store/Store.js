import { parse } from "@fortawesome/fontawesome-svg-core";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducers } from "../Reducers/cartReducers";
import { detailsReducers, productReducers } from "../Reducers/productReducers";

const initialState = {
    cart:{ 
      cartItems:  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []}
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||  compose;

 const reducer = combineReducers({
     productList: productReducers,
     productDetails: detailsReducers,
     cart: cartReducers
 })
 const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

 export default store;