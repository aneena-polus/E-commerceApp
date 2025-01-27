import React, { useState } from 'react';
import "../Styles/FormStyle.css";
import { deleteProduct } from '../Services/productService.js';
import { deleteProductFromList } from '../Redux/Slice/productSlice.js';
import { useDispatch } from 'react-redux';
import { ToastMessage } from '../Common/Toast.js';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AlertDialogModal from '../Common/Alert.js';
import { useNavigate } from 'react-router-dom';

function DeleteProduct(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        deleteProduct(props.product._id)
            .then(() => {
                dispatch(deleteProductFromList(props.product._id));
                setModalOpen(false);
                ToastMessage("Product Deleted Successfully!");
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
                navigate('/403');
            });
    };

    return (
        <>
            <IconButton title="Delete Product" color="inherit" size="medium" onClick={() => setModalOpen(true)}>
                <DeleteOutlineIcon fontSize="inherit" />
            </IconButton>
            {isModalOpen && (
                <AlertDialogModal open={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirmDelete} />
            )}
        </>
    );
}

export default DeleteProduct;
