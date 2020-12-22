import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Products from '../Products/Products';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        const fetchData = async() => {
        const{ data} = await axios.get('/api/products')
        setProducts(data)
        }
        fetchData();
    }, [])
    return (
        <div className="row center">
            {
                products.map(product=> <Products key={product._id} product={product} ></Products>)
            }
          </div>
    );
};

export default HomeScreen;