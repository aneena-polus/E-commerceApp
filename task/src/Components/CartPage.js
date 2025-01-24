import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItem, setItemQuantity, updateCartData } from '../Redux/Slice/productSlice.js';
import { buyProductsFromCart, getCartData, updateUserCart } from '../Services/productService.js';
import { useNavigate } from 'react-router-dom';
import QuantityButton from '../Common/QuantityButton.js';
import { ToastMessage } from '../Common/Toast.js';
import ViewMore from '../Common/ViewMore.js';

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

    const handleQuantityChange = (itemId, newQuantity, oldQuantity) => {
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        const cart = { userId: userId, itemId: itemId, quantity: newQuantity }
        updateUserCart(cart).then((response) => {
            dispatch(updateCartData(response.data));
            if (newQuantity == 0)
                dispatch(setItemQuantity(oldQuantity));
            else if (newQuantity < oldQuantity)
                dispatch(setItemQuantity(1));
            else
                dispatch(setItemQuantity());
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
            <h2>Shopping Cart</h2>
            {items.length > 0 ? (
                <div className="row my-3">
                    <div className='col-md-8 col-sm-12'>
                        <div className="row">
                            {items.length > 0 ? (
                                items.map((product) => (
                                    <div key={product._id} className="col-12 col-sm-6 col-md-6 mt-3">
                                        <div className="card text-dark">
                                            <div className="card-body">
                                                <img src={`http://localhost:3000/uploads/${product.itemId.imageUrl}`}
                                                    className='card-image' alt="alternate"/>
                                                <div className='d-flex align-items-end justify-content-between'>
                                                    <div>
                                                        <h5>{product.itemId.title}</h5>
                                                        <div><ViewMore text={product.itemId.description} maxLength={10} /></div>
                                                        <strong>₹{Number(product.itemId.amount).toFixed(2)}</strong>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-end'>
                                                    <div className='d-flex align-items-end gap-3'>
                                                        <button className='button-color fw-bold' onClick={() => handleQuantityChange(product.itemId._id, 0, product.quantity)}>
                                                            Remove From Cart
                                                        </button>
                                                        <QuantityButton
                                                            quantity={product.quantity ? product.quantity : 1}
                                                            maxQuantity={product.itemId.quantity}
                                                            onChange={(newQuantity) => handleQuantityChange(product.itemId._id, newQuantity, product.quantity)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))) : ( <span>No Information Available</span> )}
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="container my-3 bg-light p-4 border rounded shadow-sm">
                            <h2 className="text-center mb-4">Checkout</h2>
                            <div className="mb-4">
                                {items.map((product, index) => (
                                    <div key={index}
                                        className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                                        <div className="d-flex">
                                            <img src={`http://localhost:3000/uploads/${product.itemId.imageUrl}`} alt={product.title} className="img-thumbnail me-3"
                                                style={{ width: "70px", height: "70px" }}/>
                                            <div>
                                                <div className="fw-bold">{product.itemId.title}</div>
                                                <div className="text-muted small">Qty: {product.quantity}</div>
                                                <div className="text-muted small">MRP: {product.itemId.amount}/-</div>
                                            </div>
                                        </div>
                                        <div className="fw-bold text-success">₹{Number(product.itemId.amount).toFixed(2) * product.quantity}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <strong>Total Amount: </strong>
                                <span className='fw-bold fs-5'>₹{Number(amount).toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-success px-4 py-2 fw-bold" style={{ borderRadius: "50px" }}
                                    onClick={proceedToBuy}> Proceed to Buy </button>
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
