import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../Actions/createOrderActions';
import ErrorMessage from '../Error/ErrorMessage';
import Loading from '../Loading/Loading';

const OrderHistoryScreen = (props) => {
    const orderMineList = useSelector(state => state.orderMineList);
    const {error, loading, orders} = orderMineList;
    console.log(orderMineList)
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(listOrderMine())
    }, [dispatch])
    console.log(orders)
    return (
        <div>
            <h1>Order History</h1>
        {
            loading ? (<Loading></Loading>) : error ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => 
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : "NO"}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : "NO"}</td>
                                    <td>
                                        <button type="button" className="small" onClick={()=> props.history.push(`/order/${order._id}`)}>Details</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )
        }
        </div>
    );
};

export default OrderHistoryScreen;