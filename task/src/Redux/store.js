import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slice/productSlice.js';

const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

export default store;