import React from 'react'
import { useLocation } from 'react-router-dom';
import { updateUserCart } from '../Services/productService';
import { useDispatch } from 'react-redux';
import { setItemQuantity, updateCartData } from '../Redux/Slice/productSlice';
import { ToastMessage } from '../Common/Toast';

function ProductOverview() {

    const location = useLocation();
    const dispatch = useDispatch();
    const data = location.state;
    const productToBeViewed = data.products.find((product) => product._id == data.productId);
    
    const addToCart = (itemId) => {
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        const cart = { userId: userId, itemId: itemId };
        updateUserCart(cart).then((response) => {
            dispatch(setItemQuantity());
            dispatch(updateCartData(response.data));
            ToastMessage(response.data.message);
        })
            .catch((error) => {
                ToastMessage(error.response.data.error);
            });
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-between align-items-center">
                <div className="col-md-8">
                    <h2 className="mb-3">Product Overview</h2>
                    <div className="card p-3">
                        <div className="card-body">
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className="card-title my-0">{productToBeViewed.title}</h3>
                            {productToBeViewed.quantity > 0 &&
                                <button className='button-color fw-bold' title="Add to Cart" size="small" onClick={() => addToCart(productToBeViewed._id)}>
                                    Add to Cart
                                </button>}
                            </div>
                            {productToBeViewed.quantity>0 ?
                                <span className="badge bg-info mb-3">In stock: {productToBeViewed.quantity}</span>
                                : <span className="badge bg-warning">Out of stock</span>
                            }
                            <div>
                                <h4 className='d-inline'>
                                    <h6 className='d-inline'>₹</h6>{Number(productToBeViewed.amount).toFixed(2)}
                                </h4>
                                <span className='text-body-secondary'>/count</span>
                            </div> 
                            <img
                                src={`http://localhost:3000/uploads/${productToBeViewed.imageUrl}`}
                                className="img-fluid mt-3"
                                alt="Product"
                            />
                            <div><strong>About this item:</strong></div>
                            <p className="card-text text-justify">{productToBeViewed.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductOverview