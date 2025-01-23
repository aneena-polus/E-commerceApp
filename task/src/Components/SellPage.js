import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../Redux/Slice/productSlice.js';
import { getItemsById } from '../Services/productService.js';
import { ProductContext } from '../Context/ProductContext.js';
import AddOrUpdateProduct from './AddOrUpdateProduct.js';
import "../Styles/FormStyle.css"
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewMore from '../Common/ViewMore.js';
import { useNavigate } from 'react-router-dom';
import DeleteProduct from './DeleteProduct.js';

function SellPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.product.productData);
    const { setProductData } = useContext(ProductContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        try {
            getItemsById().then((response) => {
                dispatch(setProducts(response.data || []));
            })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    navigate('/403');
                    dispatch(setProducts([]));
                });
        } catch (err) {
            navigate('/403');
        }
    }, [dispatch, navigate]);

    const toggleModal = (product = null) => {
        setShowModal((prevState) => !prevState);
        setProductData(product);
    };

    return (
        <div className="container mt-4">
            {showModal ? <AddOrUpdateProduct onClose={toggleModal} /> : <></>}
            <div className="align-items-center d-flex justify-content-between">
                <h2>My Products To Be Sold</h2>
                <span className='text-color'>
                    <div className='d-flex align-items-end'>
                        <span className='text-color'>
                            <IconButton color="inherit" size="large" onClick={() => toggleModal(null)} title="Add Product">
                                <AddBoxIcon fontSize="inherit" />
                            </IconButton>
                        </span>
                    </div>
                </span>
            </div>
            <div className="row my-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 mt-3">
                            <div className="card text-dark">
                                <div className="card-body">
                                    <img src={`http://localhost:3000/uploads/${product.imageUrl}`} className='card-image' alt="alternate" />
                                    <div className='d-flex align-items-end justify-content-between'>
                                        <div>
                                            <h5 className='my-0'>{product.title}</h5>
                                            <div><ViewMore text={product.description} maxLength={25} /></div>
                                            <strong className='fs-4'><h6 className='d-inline'>₹</h6>{product.amount}</strong>
                                            <div>
                                            {product.quantity > 0 ?
                                                <span className="badge bg-success mb-1">In stock: {product.quantity}</span>
                                                : <span className="badge bg-warning mb-1">Out of stock</span>
                                            }
                                        </div>
                                        </div>
                                        <div className='d-flex justify-content-end align-items-end'>
                                        <span className='text-color'>
                                            <IconButton size="medium" color="inherit" title="Edit Product" onClick={() => toggleModal(product)}>
                                                <EditNoteIcon fontSize="inherit" />
                                            </IconButton>
                                        </span>
                                        <span className='text-color'>
                                            <DeleteProduct product={product} />
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

export default SellPage;
