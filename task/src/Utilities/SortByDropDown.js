import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SortByDropDown(props) {

    const [sort, setSort] = useState(props.quantity);
    const menuItems = Array.from({ length: props.quantity }, (_, index) => index + 1);

    const handleValueChange = (event) => {
        setSort(event.target.value);
        props.handleChange(event.target.value);
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 50 }} color="secondary">
                <InputLabel id="demo-simple-select-standard-label">Quantity</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sort}
                    autoWidth
                    onChange={handleValueChange}
                    label="Sort By"
                >
                    {menuItems.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default SortByDropDown