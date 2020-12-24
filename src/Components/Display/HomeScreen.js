import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../Actions/productActions';
import ErrorMessage from '../Error/ErrorMessage';
import Loading from '../Loading/Loading';
import Products from '../Products/Products';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    useEffect(() => {
        dispatch(listProduct()) 
    }, [dispatch])
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