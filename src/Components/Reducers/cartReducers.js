import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../Constants/CartConstants";
import { CART_EMPTY } from "../Constants/orderConstants";

export const cartReducers = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
        const item = action.payload;
        const existItem = state.cartItems.find(pd => pd.product === item.product) 
        if(existItem){
            return {
                ...state,
                cartItems: state.cartItems.map(pd => pd.product === existItem.product ? item : pd)
            }
        }
        else {
            return {
                ...state, cartItems: [...state.cartItems, item]
            }
        }
        case CART_REMOVE_ITEM: 
        return {
            ...state, cartItems: state.cartItems.filter(prd => prd.product !== action.payload)
        }
        case CART_SAVE_SHIPPING_ADDRESS: 
        return {
            ...state, shippingAddress: action.payload
        }
        case CART_SAVE_PAYMENT_METHOD: 
        return {
            ...state, paymentMethod: action.payload
        }
        case CART_EMPTY: 
        return{
            ...state, cartItems: []
        }
        default:
            return state;
    }
}