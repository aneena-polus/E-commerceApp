import React from 'react'
import { useLocation } from 'react-router-dom';

function ProductOverview() {

    const location = useLocation();
    const data = location.state;
    const productToBeViewed = data.products.find((product) => product._id == data.productId);

    return (
        <div className="container mt-4">
            <div className="row justify-content-between align-items-center">
                <div className="col-md-8">
                    <h2 className="mb-3">Product Overview</h2>
                    <div className="card p-3">
                        <div className="card-body">
                            <h3 className="card-title">{productToBeViewed.title}</h3>
                            {productToBeViewed.quantity>0 ?
                                <span className="badge bg-info">In stock: {productToBeViewed.quantity}</span>
                                : <span className="badge bg-warning">Out of stock</span>
                            }
                            <h4>₹{productToBeViewed.amount}</h4>
                            <img
                                src={`http://localhost:3000/uploads/${productToBeViewed.imageUrl}`}
                                className="img-fluid mt-3"
                                alt="Product"
                            />
                            <div><strong>About this item:</strong></div>
                            <p className="card-text">{productToBeViewed.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductOverview