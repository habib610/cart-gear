import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../Actions/createOrderActions";
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading/Loading";
import CheckoutSteps from "./CheckoutSteps";

const OrderSummary = (props) => {
  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const toPrice = (num) => Number(num.toFixed(2));
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [orderId, dispatch]);
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
                  <strong>Name:</strong> { order.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {order.shippingAddress.address}{" "}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.country}
                </p>
                {
                    order.isDelivered ?(<ErrorMessage variant="success">Delivered at {order.deliveredAt}</ErrorMessage>) : 
                    (<ErrorMessage variant="danger">Not Delivered</ErrorMessage>)
                }
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment Method</h2>
                {
                    order.isPaid ?(<ErrorMessage variant="success">Paid at {order.deliveredAt}</ErrorMessage>) : 
                    (<ErrorMessage variant="danger">Not Paid</ErrorMessage>)
                }
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
