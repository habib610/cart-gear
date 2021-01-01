import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../Actions/CartActions';
import CheckoutSteps from './CheckoutSteps';

const PaymentMethod = (props) => {
    const dispatch = useDispatch();
  
    // const {shippingAddress} = cart;
    // console.log(shippingAddress, cart)
    // if(!shippingAddress.address) {
    //     props.history.push('/shipping')
    // }

    const [payment, setPayment] = useState('paypal');
    const handleSubmit = (e)=> {
        e.preventDefault()
        dispatch(savePaymentMethod(payment))
        props.history.push('/placeorder')
    }
    const cart = useSelector(state => state.cart);
    console.log(cart)
    return (
        <div>
            <CheckoutSteps step1 step2 step3/>
        <form onSubmit={handleSubmit} action="" className="form">
            <div>
               <h1>Payment</h1> 
            </div>
            <div>
            <div>
                <input type="radio"
                id="payPal"
                value="paypal"
                name="paymentMethod"
                checked
                onChange={(e)=> setPayment(e.target.value)}
                />
                <label htmlFor="payPal">PayPal</label>
            </div>
            {/* <div>
                <input type="radio"
                id="stripe"
                value="stripe"
                name="paymentMethod"
                onChange={(e)=> setPayment(e.target.value)}
                />
                <label htmlFor="stripe">Stripe</label>
            </div> */}
            </div>
            
            <div>
                <button type="submit" className="primary">Continue</button>
            </div>

        </form>
        </div>
    );
};

export default PaymentMethod;