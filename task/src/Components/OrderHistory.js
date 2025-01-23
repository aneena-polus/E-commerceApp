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
                <div className="row">
                    {orderHistory.items.map((order) => (
                        <div key={order._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title my-0">{order.itemId?.title}</h5>
                                    <p className="card-text my-0">
                                        Quantity: {order.quantity}
                                    </p>
                                    <img src={`http://localhost:3000/uploads/${order.itemId?.imageUrl}`} className='card-image' alt="alternate" />
                                    <p className="card-text my-0">
                                        <ViewMore
                                            text={order.itemId?.description}
                                            maxLength={25}
                                        />
                                    </p>
                                    <p className="card-text my-0">
                                        <strong className='fs-5'>Price: <h6 className='d-inline'>₹</h6>{order.itemId?.amount}</strong>
                                    </p>
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
