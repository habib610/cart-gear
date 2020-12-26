import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/CartConstants";

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
        default:
            return state;
    }
}