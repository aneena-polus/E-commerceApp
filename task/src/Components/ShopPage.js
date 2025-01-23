import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllShopItems, setItemQuantity, updateCartData } from '../Redux/Slice/productSlice.js';
import { getAllProducts, getFilteredData, updateUserCart } from '../Services/productService.js';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "../Styles/FormStyle.css";
import { grey } from '@mui/material/colors';
import TimeAgo from 'react-timeago';
import ViewMore from '../Common/ViewMore.js';
import { ToastMessage } from '../Common/Toast.js';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

function ShopPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const products = useSelector((state) => state.product.productData);

    useEffect(() => {
        getAllProducts().then((response) => {
            dispatch(setAllShopItems(response.data || []));
        })
            .catch((error) => {
                console.error('Error fetching products:', error);
                dispatch(setAllShopItems([]));
            });
    }, [dispatch]);

    const addToCart = (itemId) => {
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        const cart = { userId: userId, itemId: itemId };
        updateUserCart(cart).then((response) => {
            if (response.data.message == "Item added to cart successfully.")
                dispatch(setItemQuantity());
            dispatch(updateCartData(response.data));
            ToastMessage(response.data.message);
        })
            .catch((error) => {
                ToastMessage(error.response.data.error);
            });
    };

    const filterTitle = (event) => {
        const searchValue = event.target.value.trim();
        if (searchValue === '') {
            setFilteredProducts([]);
        }
        else {
            getFilteredData(searchValue)
                .then((response) => {
                    setFilteredProducts(response.data || []);
                })
                .catch((error) => {
                    console.error('Error fetching filtered data:', error);
                    setFilteredProducts([]);
                });
        }
    };


    const viewProduct = (productId) => {
        navigate(`/shop/${productId}`, { state: { products, productId } })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Start Shopping</h2>
                <div className="search-container d-flex align-items-center justify-content-end">
                    <form className="search-container input-group">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search products..."
                            onChange={filterTitle}
                            aria-label="Search"
                        />
                        <i className="fas fa-search search-icon"></i>
                    </form>
                </div>
            </div>
            {filteredProducts.length > 0 && (
                <div className="mt-3">
                    <ul className="list-group">
                        {filteredProducts.map((post) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={post.id}>
                                <div>
                                    <h5 className="mb-1">{post.title}</h5>
                                </div>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => viewProduct(post._id)}>
                                    View
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="row my-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 mt-3">
                            <div className="card text-dark">
                                <div className="card-body">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <strong>{product.createUser.username}</strong>
                                        <TimeAgo date={product.createTimestamp} style={{ color: grey[600], fontSize: 13 }} />
                                    </div>
                                    <img src={`http://localhost:3000/uploads/${product.imageUrl}`} className='card-image' alt="alternate" />
                                    <div className='d-flex align-items-end justify-content-between'>
                                        <div>
                                            <h5>{product.title}</h5>
                                            {product.quantity > 0 ?
                                                <span className="badge bg-info">In stock</span>
                                                : <span className="badge bg-warning">Out of stock</span>
                                            }
                                            <div><ViewMore text={product.description} maxLength={25} /></div>
                                            <strong>₹{product.amount}</strong>
                                        </div>
                                        <div className='d-flex justify-content-end align-items-end'>
                                            <span>
                                                <IconButton title="View Product" color="secondary" size="medium" onClick={() => viewProduct(product._id)}>
                                                    <VisibilityIcon fontSize='inherit' />
                                                </IconButton>
                                                {product.quantity > 0 &&
                                                    <IconButton title="Add to Cart" color="secondary" size="medium" onClick={() => addToCart(product._id)}>
                                                        <AddShoppingCartIcon fontSize='inherit' />
                                                    </IconButton>}
                                            </span>
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
    );
}

export default ShopPage;
