import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import ErrorMessage from '../Error/ErrorMessage';
import Loading from '../Loading/Loading';
import Products from '../Products/Products';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/products')
                setProducts(data)
                setLoading(false)
            }
            catch (err) {
                if (err) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }
        fetchData();
    }, [])
    return (
        <div className="row center">
            {
                loading ? ( <Loading />) : error ?( <ErrorMessage variant="danger">
                    {error}
                </ErrorMessage>) :
                products.map(product => <Products key={product._id} product={product} ></Products>)
            }
           
        </div>
    );
};

export default HomeScreen;