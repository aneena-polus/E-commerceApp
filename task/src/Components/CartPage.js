import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItem, setItemQuantity, updateCartData } from '../Redux/Slice/productSlice.js';
import { buyProductsFromCart, getCartData, updateUserCart } from '../Services/productService.js';
import { useNavigate } from 'react-router-dom';
import QuantityButton from '../Common/QuantityButton.js';
import { ToastMessage } from '../Common/Toast.js';
import { IconButton } from '@mui/material';
import ViewMore from '../Common/ViewMore.js';
import DeleteIcon from '@mui/icons-material/Delete';

function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.product.cartData.items || []);
    const amount = items.reduce((total, item) => {
        return total + item.itemId.amount * item.quantity;
    }, 0);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        getCartData(userId).then((response) => {
            dispatch(setItem(response.data || []));
        })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
                navigate('/403');
            });
    }, [dispatch, navigate]);

    const handleQuantityChange = (itemId, newQuantity) => {
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        const cart = { userId: userId, itemId: itemId, quantity: newQuantity }
        updateUserCart(cart).then((response) => {
            dispatch(updateCartData(response.data));
            if(newQuantity == 0) {
                dispatch(setItemQuantity(response.data));
            }
            ToastMessage('Cart Updated Successfully')
        })
    };

    const proceedToBuy = () => {
        buyProductsFromCart().then((response) => { 
            dispatch(setItem({}));
            ToastMessage('Products Bought Successfully')
        })
    };

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            {items.length > 0 ? (
                <div className="row my-3">
                <div className='col-md-8 col-sm-12'>
                    <div className="row">
                        {items.length > 0 ? (
                            items.map((product) => (
                                <div key={product._id} className="col-12 col-sm-6 col-md-6 mt-3">
                                    <div className="card text-dark">
                                        <div className="card-body">
                                            <img
                                                src={`http://localhost:3000/uploads/${product.itemId.imageUrl}`}
                                                className='card-image'
                                                alt="alternate"
                                            />
                                            <div className='d-flex align-items-end justify-content-between'>
                                                <div>
                                                    <h5>{product.itemId.title}</h5>
                                                    <div><ViewMore text={product.itemId.description} maxLength={25} /></div>
                                                    <strong>₹{Number(product.itemId.amount).toFixed(2)}</strong>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-end'>
                                                    <div className='d-flex align-items-end gap-3'>
                                                        <button className='button-color' onClick={() => handleQuantityChange(product.itemId._id, 0)}> 
                                                            Remove From Cart
                                                        </button>
                                                        <QuantityButton
                                                            quantity={product.quantity ? product.quantity : 1}
                                                            maxQuantity={product.itemId.quantity}
                                                            onChange={(newQuantity) => handleQuantityChange(product.itemId._id, newQuantity)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span>No Information Available</span>
                        )}
                    </div>
                </div>
                <div className='col-md-4 col-sm-12'>
                    <div className="container my-3 bg-light p-4 border rounded shadow-sm">
                        <h2 className="text-center mb-4">CheckOut</h2>
                        <div>
                            <div className="mb-3"><strong>Total of: </strong>{items.length} items</div>
                            <div className="mb-3"><strong>Total Amount:</strong> ₹{Number(amount).toFixed(2)}</div>
                            <div className="d-flex justify-content-center">
                                <IconButton
                                    size="small"
                                    color='inherit'
                                    style={{ borderRadius: '50px', backgroundColor: '#28a745', padding: '10px 20px' }}
                                    onClick={proceedToBuy} 
                                >
                                    Proceed to Buy
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : 
            (<div className="text-center mt-4">
                <h5>Cart is Empty</h5>
                <p>Your cart is empty. Will appear once you add items to the cart.</p>
            </div>)}
        </div>
    );
}

export default CartPage;
