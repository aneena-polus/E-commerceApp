import { IconButton } from '@mui/material';
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
        <div>
            <IconButton color="secondary" size="small" aria-label="delete" onClick={decreaseQuantity} disabled={localQuantity <= 0}>
                <RemoveIcon fontSize='inherit' style={{border: "1px solid #a6859a"}} />
            </IconButton>
            <span> {localQuantity} </span>
            <IconButton color="secondary" size="small" aria-label="delete" onClick={increaseQuantity} disabled={localQuantity >= maxQuantity}>
                <AddIcon fontSize='inherit' style={{border: "1px solid #a6859a"}}/>
            </IconButton>
        </div>
    );
}

export default QuantityButton;
