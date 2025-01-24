import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function QuantityButton({ quantity, maxQuantity, onChange }) {
    const [localQuantity, setLocalQuantity] = useState(quantity || 1);

    const increaseQuantity = () => {
        if (localQuantity < maxQuantity) {
            setLocalQuantity(prevQuantity => {
                const newQuantity = prevQuantity + 1;
                onChange(newQuantity); 
                return newQuantity;
            });
        }
    };

    const decreaseQuantity = () => {
        if (localQuantity > 0) {
            setLocalQuantity(prevQuantity => {
                const newQuantity = prevQuantity - 1;
                onChange(newQuantity); 
                return newQuantity;
            });
        }
    };

    return (
        <div className='border-design'>
            <button className='button-color' style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}} size="small" aria-label="delete" onClick={decreaseQuantity} disabled={localQuantity <= 1}>
                <RemoveIcon fontSize='inherit'/>
            </button>
            <span className='fw-bold px-2'> {localQuantity} </span>
            <button className='button-color' style={{borderBottomLeftRadius: '0', borderTopLeftRadius: '0'}} size="small" aria-label="delete" onClick={increaseQuantity} disabled={localQuantity >= maxQuantity}>
                <AddIcon fontSize='inherit'/>
            </button>
        </div>
    );
}

export default QuantityButton;
