import React from 'react';

const CheckoutSteps = (props) => {
    return (
        <div className="row checkoutSteps">
            <div className={props.step1 ? "active" : ''}>SignIn</div>
            <div className={props.step2 ? "active" : ''}>Shipping</div>
            <div className={props.step3 ? "active" : ''}>Payment</div>
            <div className={props.step4 ? "active" : ''}>Place Order</div>
        </div>
    );
};

export default CheckoutSteps;