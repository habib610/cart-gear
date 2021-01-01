import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducers } from "../Reducers/cartReducers";
import {
  orderCreateReducers,
  orderDetailsReducers,
  orderPayReducer,
} from "../Reducers/orderReducers";
// import { orderCreateReducers } from "../Reducers/orderReducers";
import { detailsReducers, productReducers } from "../Reducers/productReducers";
import { useRegisterReducers, userReducers } from "../Reducers/userReducers";

const initialState = {
  singInInfo: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  productList: productReducers,
  productDetails: detailsReducers,
  cart: cartReducers,
  singInInfo: userReducers,
  useRegister: useRegisterReducers,
  createOrder: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducer
});
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
