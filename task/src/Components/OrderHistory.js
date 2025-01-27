import React, { useEffect, useState } from 'react';
import { getOrderHistory } from '../Services/productService';
import { useNavigate } from 'react-router-dom';
import ViewMore from '../Common/ViewMore';

function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOrderHistory()
            .then((response) => {
                setOrderHistory(response.data.orders || []);
            })
            .catch((error) => {
                console.error('Error fetching order data:', error);
                navigate('/403');
            });
    }, [navigate]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Your Order History</h2>
            {orderHistory.items ? (
                <div className="row py-3">
                    {orderHistory.items.map((order) => (
                        <div key={order._id} className="col-12 mb-4">
                            <div className="card rounded-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 text-center">
                                            <img src={`http://localhost:3000/uploads/${order.itemId?.imageUrl}`}
                                                className="img-fluid rounded-start" alt="alternate" />
                                        </div>
                                        <div className="col-md-8 d-flex justify-content-between flex-column">
                                            <div>
                                                <h5 className="card-title my-0">{order.itemId?.title}</h5>
                                                <p className="card-text my-0">Quantity: {order.quantity}</p>
                                                <p className="card-text my-0">
                                                    <ViewMore text={order.itemId?.description} maxLength={300} />
                                                </p>
                                                <div className="card-text my-0">
                                                    <h6 className="d-inline">₹</h6>
                                                    <h4 className="d-inline">{Number(order.itemId?.amount).toFixed(2)}</h4>
                                                    <span className="text-body-secondary">/count</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="card-text text-body-secondary">Ordered on {new Date(order.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-4">
                    <h5>No Orders Found</h5>
                    <p>Your order history will appear here once you place an order.</p>
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
