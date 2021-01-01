import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createdOrder } from '../Actions/OrderActions';
import { ORDER_CREATE_RESET } from '../Constants/orderConstants';
import ErrorMessage from '../Error/ErrorMessage';
import Loading from '../Loading/Loading';
import CheckoutSteps from './CheckoutSteps';

const PlaceOrder = (props) => {
    const cart = useSelector(state => state.cart);

    if(!cart.paymentMethod) {
        props.history.push('/shipping')
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const toPrice = num => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((total, current)=> total + current.qty * current.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createdOrder({...cart, orderItems: cart}))
    }

    useEffect(()=> {
        if(success) {
            props.history.push(`/order/${order._id}`)
        }
        dispatch({type: ORDER_CREATE_RESET})
    }, [success, props.history, order, dispatch])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
            <div className="col-2">
                <ul>
                    <li>
                        <div className="card card-body">
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:</strong> Md Habibur Rahman <br/>
                            <strong>Address:</strong> Uttara, 1201, Dhaka, Bangladesh
                        </p>
                        </div>
                    </li>
                    <li>
                        <div className="card card-body">
                        <h2>Payment Method</h2>
                        <p>
                            {
                                cart.paymentMethod
                            }
                        </p>
                        </div>
                    </li>
                    <li>
                        <div className="card card-body">
                        <h2>Payment Method</h2>
                        <ul>
              {cart.cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img className="small" src={`/${item.image}`}  alt={item.name} />
                    </div>
                    <div className="min-30"> <Link to={`products/${item.product}`}>{item.name}</Link> </div>
                    <div>
                        {item.qty } x ${item.price} = ${item.qty * item.price}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                                <div>Items</div>
                                <div> ${cart.itemsPrice} </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping</div>
                                <div> ${cart.shippingAddress} </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Tax</div>
                                <div> ${cart.taxPrice} </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div> <strong>Order Total</strong> </div>
                                <div> <strong>${cart.totalPrice}</strong>  </div>
                            </div>
                        </li>
                        <li>
                            <button type="button" className="primary block"
                            onClick={placeOrderHandler}
                            disabled={cart.cartItems === 0}
                            >Place Order</button>
                        </li>
                        {
                            loading && <Loading/>
                        }
                        {
                            error && <ErrorMessage variant="danger">{error}</ErrorMessage>
                        }
                    </ul>
                </div>
            </div>
            </div>
        </div>
    );
};

export default PlaceOrder;