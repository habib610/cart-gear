import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from "../Actions/createOrderActions";
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading/Loading";
import {ORDER_PAY_RESET} from '../Constants/orderConstants'

const OrderSummary = (props) => {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const orderPay = useSelector(state => state.orderPay);
  const {error: errorPay, loading:loadingPay, success: successPay} = orderPay;
  useEffect(() => {
    const addPayPalScript = async () => {
        const { data } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };
      if (!order || successPay || (order && order._id !== orderId ) ) {
        dispatch({type: ORDER_PAY_RESET})
        dispatch(detailsOrder(orderId));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
  }, [orderId, order, sdkReady, successPay, dispatch]);

  const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(order, paymentResult))
  };

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <ErrorMessage variant="danger">{error}</ErrorMessage>
  ) : (
    <div>
      <h1>Order #{order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {order.shippingAddress.address}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.city} {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <ErrorMessage variant="success">
                    Delivered at {order.deliveredAt}
                  </ErrorMessage>
                ) : (
                  <ErrorMessage variant="danger">Not Delivered</ErrorMessage>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment Method</h2>
                {order.isPaid ? (
                  <ErrorMessage variant="success">
                    Paid at: {order.paidAt}
                  </ErrorMessage>
                ) : (
                  <ErrorMessage variant="danger">Not Paid</ErrorMessage>
                )}
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment Method</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            className="small"
                            src={`/${item.image}`}
                            alt={item.name}
                          />
                        </div>
                        <div className="min-30">
                          {" "}
                          <Link to={`products/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                        </div>
                        <div>
                          {item.qty} x {item.price} = $ {item.qty * item.price}
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
                  <div> $ {order.itemsPrice.toFixed(2)} </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div> $ {order.shippingPrice.toFixed(2)} </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div> $ {order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>$ {order.totalPrice.toFixed(2)} </strong>
                  </div>
                </div>
              </li>

              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <Loading></Loading>
                  ) : (
                      <>
                      {
                          errorPay && <ErrorMessage variant="danger">{errorPay}</ErrorMessage>
                      }
                      {
                          loadingPay && (<Loading/>)
                      }
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
