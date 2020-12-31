import React from 'react';
import { useState } from 'react';
import CheckoutSteps from './CheckoutSteps';

const ShippingAddress = () => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        //
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