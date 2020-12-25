import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Actions/CartActions';

const CartScreen = (props) => {
    const productId = props.match.params.id;
    console.log(props.location.search)
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const dispatch = useDispatch()
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, qty, productId])
    return (
        <div>
            <h1>Cart Products: productId: {productId} , qty: {qty} </h1>
        </div>
    );
};

export default CartScreen;