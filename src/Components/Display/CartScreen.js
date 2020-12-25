import React from 'react';

const CartScreen = (props) => {
    const id = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    return (
        <div>
            <h1>Cart Products: productId: {id} , qty: {qty} </h1>
        </div>
    );
};

export default CartScreen;