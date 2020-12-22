import React from 'react';
import { useState } from 'react';
import data from '../../data';
import Rating from '../Rating/Rating';

const DetailsScreen = (props) => {
    const [quantity, setQuantity] = useState(1);
    const id = props.match.params.id;
    const product = data.products.find(pd => pd._id === id);
    if(!product){
      return  <h1>Product Not Found</h1>
    }
    return (
        <div className="row top">
            <div className="col-2">
            <img className="large" src={`/${product.image}`} alt={product.name}/>
            </div>
            <div className="col-1 ">
                <ul>
                    <li>
                        <div className="row">
                        <div>
                            Name:
                        </div>
                        <div>
                            {product.name}
                        </div>
                        </div>
                        </li>
                    <li>
                        <div className="row">
                            <div>Details:</div>
                            <div>{product.description}</div>
                        </div>
                    </li>
                    <li>
                    <div className="row">
                            <div>Price:</div>
                            <div>${product.price}</div>
                        </div>
                    </li>
                    <li>
                    <Rating reviews = {product.numReviews} rating={product.rating}></Rating>
                    </li>
                </ul>
                </div>

            <div className="col-1">
           <ul>
                <li>
                <div className="row">
                    <div>
                        Price:
                    </div>
                    <div>${product.price}</div>
                </div>
                </li>
                <li>
                <div className="row">
                            <div>Status:</div>
                            <div>{product.countInStock > 0 ? (
                                <div className="success">Available</div>
                            )
                        : (
                            <div className="error">Out of Stock</div>
                        )}</div>
                        </div>
                </li>
                {
                    product.countInStock ? (
                        <>
                        <li>
                    <div className="row">
                        <div>Quantity:</div>
                        <div>
                            <select onChange={(e)=> setQuantity(e.target.value)} value={quantity} name="" id="">
                              {
                                    [...Array(product.countInStock).keys()].map(value => <option key={value + 1} value={value + 1}>
                                        {value + 1}
                                    </option> )
                            }
                            </select>
                        </div>
                    </div>
                </li>
                <li>
                    <button>Add to Cart</button>
                </li>
                </>
                    ) : ""
                }
            </ul>
           </div>
        </div>
    );
};

export default DetailsScreen;