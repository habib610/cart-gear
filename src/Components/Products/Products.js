import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const Products = ({ product }) => {
    const { _id, name, price, numReviews, image, rating } = product || {};
    return (
        <div className="card">
            <Link to={`/products/${_id}`}>
                <img src={image} alt="" className="card-image" />
            </Link>
            <div className="card-body">
                <Link to={`/products/${_id}`}>
                    <h2>{name}</h2>
                </Link>
                <p>Price: ${price}</p>
                <div>
                    <Rating reviews={numReviews} rating={rating}></Rating>
                </div>
            </div>
        </div>
    );
};

export default Products;
