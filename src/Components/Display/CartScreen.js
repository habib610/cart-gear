import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Actions/CartActions";
import ErrorMessage from "./../Error/ErrorMessage";
const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, qty, productId]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCart = (id) => {
      //delete
  }
  const checkoutHandler = () => {
      props.history.push(`/signin?redirect=shipping`)
  }
  return (
    <div className="row top">
      <div className="col-2">
        <h2>Shopping Cart</h2>
        <div>
          {cartItems.length === 0 ? (
            <ErrorMessage>
              Your Cart Is Empty <Link to="/">Go to Home</Link>
            </ErrorMessage>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img className="small" src={`/${item.image}`}  alt={item.name} />
                    </div>
                    <div className="min-30"> <Link to={`products/${item.product}`}>{item.name}</Link> </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((prd) => (
                          <option key={prd + 1} value={prd + 1}>
                            {prd + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                        <button onClick={()=> removeFromCart(item.product)}>Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="col-1">
          <div className="card card-body">
          <h4>Subtotal: ({
              cartItems.reduce((total, current)=> total + current.qty , 0) 
              }) Items 
              : ${
                  cartItems.reduce((total, current)=> total + current.price * current.qty, 0)
              }
              </h4>
          <button className="primary block" onClick={checkoutHandler}>Checkout</button>
          </div>
      </div>
    </div>
  );
};

export default CartScreen;
