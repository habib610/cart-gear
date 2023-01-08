import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { detailsProduct } from "../Actions/productActions";
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading/Loading";
import Rating from "../Rating/Rating";

const DetailsScreen = (props) => {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const [quantity, setQuantity] = useState(1);
    const productId = props.match.params.id;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCart = () => {
        props.history.push(`/cart/${productId}?qty=${quantity}`);
    };

    return (
        <div className={`${loading && "row center"}`}>
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
                <div className="row top">
                    <Link to="/">Back to Home </Link>
                    <div className="col-2">
                        <img
                            className="large"
                            src={`/${product.image}`}
                            alt={product.name}
                        />
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>
                                        {" "}
                                        <strong> {product.name}</strong>{" "}
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
                                <Rating
                                    reviews={product.numReviews}
                                    rating={product.rating}
                                ></Rating>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1 border">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price:</div>
                                    <div>${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status:</div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <div className="success">
                                                Available
                                            </div>
                                        ) : (
                                            <div className="danger">
                                                Out of Stock
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                            {product.countInStock ? (
                                <>
                                    <li>
                                        <div className="row">
                                            <div>Quantity:</div>
                                            <div>
                                                <select
                                                    onChange={(e) =>
                                                        setQuantity(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={quantity}
                                                    name=""
                                                    id=""
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((value) => (
                                                        <option
                                                            key={value + 1}
                                                            value={value + 1}
                                                        >
                                                            {value + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button
                                            className="primary block"
                                            onClick={addToCart}
                                        >
                                            Add to Cart
                                        </button>
                                    </li>
                                </>
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsScreen;
