import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingActions } from '../Actions/CartActions';
import CheckoutSteps from './CheckoutSteps';

const ShippingAddress = (props) => {
    const singInInfo = useSelector(state => state.singInInfo);
    const {userInfo} = singInInfo;

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo) {
        props.history.push('/signin')
    }
   

   
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [city, setCity] = useState(shippingAddress.city);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        //
        e.preventDefault()
        dispatch(saveShippingActions({fullName, address,  city, postalCode, country}))
        props.history.push('/payment')
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form action="" onSubmit={handleSubmit} className="form">
                <div>
                    <h1>Shipping Info</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text"
                    id="fullName"
                    placeholder="Enter Your Full Name"
                    value={fullName}
                    onChange={(e)=> setFullName(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text"
                    id="address"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text"
                    id="postalCode"
                    placeholder="Enter Your Postal Code"
                    value={postalCode}
                    onChange={(e)=> setPostalCode(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text"
                    id="city"
                    placeholder="Enter Your City"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text"
                    id="country"
                    placeholder="Enter Country Name"
                    value={country}
                    onChange={(e)=> setCountry(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <button type="submit" className="primary">Continue</button>
                </div>
            </form>
        </div>
    );
};

export default ShippingAddress;