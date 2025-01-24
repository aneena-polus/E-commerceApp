import React, { useContext, useState } from 'react';
import { onFormDataChange } from '../Utilities/FormUtils.js';
import { ProductContext } from '../Context/ProductContext.js';
import { addProduct, updateProduct } from '../Services/productService.js';
import { validate } from '../Utilities/FormUtils.js';
import { useDispatch } from 'react-redux';
import { updateProductInList, addProductInList } from '../Redux/Slice/productSlice.js';
import { ToastMessage } from '../Common/Toast.js';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../Common/ImageUploader.js';

function AddOrUpdateProduct(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productData } = useContext(ProductContext);
    const [newField, setnewField] = useState({
        title: productData?.title || '',
        description: productData?.description || '',
        image: productData?.imageUrl || '',
        amount: productData?.amount || '',
        quantity: productData?.quantity || '',
        createUser: JSON.parse(localStorage.getItem('userData'))._id,
        createTimestamp: new Date()
    });
    const [errors, setErrors] = useState({});
    const onInputChange = onFormDataChange(setnewField);

    const handleFileChange = (newValue) => {
        setnewField((prevState) => ({
            ...prevState,
            image: newValue
        }));
    };

    const onFormSubmission = (event) => {
        event.preventDefault();
        const requiredFields = ['title', 'description', 'image', 'amount', 'quantity'];
        const isValid = validate(newField, requiredFields, setErrors);
        if (!isValid) return;
        const formData = new FormData();
        formData.append('_id', productData?._id)
        formData.append('title', newField.title);
        formData.append('description', newField.description);
        formData.append('image', newField.image);
        formData.append('amount', newField.amount);
        formData.append('quantity', newField.quantity);
        formData.append('createUser', newField.createUser);
        formData.append('createTimestamp', newField.createTimestamp);
        const AddOrUpdateProduct = productData?._id
            ? updateProduct(formData)
            : addProduct(formData);
        AddOrUpdateProduct
            .then((response) => {
                productData?._id
                    ? dispatch(updateProductInList(response.data))
                    : dispatch(addProductInList(response.data));
                ToastMessage(productData?._id ? 'Product Updated Successfully!' : 'Product Added Successfully!');
            })
            .catch((error) => {
                console.error(productData?._id ? 'Error updating product:' : 'Error adding product:', error);
                navigate('/403');
            })
            .finally(() => {
                setnewField({ title: '', description: '', image: '' });
                props.onClose();
            });
    };

    return (
        <div className="modal show d-block bg-blur" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">{productData ? 'Edit Product' : 'Add Product'}</h5>
                        <button type="button" className="btn-close" title="Close" onClick={props.onClose}
                            aria-label="Close"></button>
                    </div>
                    <form onSubmit={onFormSubmission}>
                        <div className="modal-body">
                            <div className="mb-2">
                                <label htmlFor="title" className="form-label fw-semibold">
                                    <span className='text-danger'>*</span>Title:</label>
                                <input type="text" id="title" name="title"
                                    value={newField.title} onChange={onInputChange}
                                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                />
                                {errors.title && <div className="text-danger">*Title is required</div>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="description" className="form-label fw-semibold">
                                    <span className='text-danger'>*</span>Description:</label>
                                <textarea id="description" name="description"
                                    value={newField.description} onChange={onInputChange}
                                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                ></textarea>
                                {errors.description && <div className="text-danger">*Description is required</div>}
                            </div>
                            <div className="mb-2">
                                <div className='row'>
                                    <div className='col-6'>
                                        <label htmlFor="amount" className="form-label fw-semibold">
                                            <span className='text-danger'>*</span>Amount:</label>
                                        <input type="text" id="amount" name="amount"
                                            value={newField.amount} onChange={onInputChange}
                                            className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                                        />
                                        {errors.amount && <div className="text-danger">*Amount is required</div>}
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="quantity" className="form-label fw-semibold">
                                            <span className='text-danger'>*</span>Quantity:</label>
                                        <input type="text" id="quantity" name="quantity"
                                            value={newField.quantity} onChange={onInputChange}
                                            className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
                                        />
                                        {errors.quantity && <div className="text-danger">*Quantity is required</div>}
                                    </div>

                                </div>
                            </div>
                            <div>
                                <label htmlFor="image" className="form-label fw-semibold">
                                    <span className='text-danger'>*</span>Upload an image:</label>
                                    <ImageUploader onChange={(file)=>handleFileChange(file)} image={newField.image}/>
                                {errors.image && <div className="text-danger">*Image is required</div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={props.onClose}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-success" title={productData ? 'Update' : 'Add'}>
                                {productData ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddOrUpdateProduct;
