import axios from 'axios';

export const getAllProducts = () => {
    const userId = JSON.parse(localStorage.getItem('userData'))._id;
    return axios.post(`/api/getAllItems`,{_id: userId},{ withCredentials: true });
};
 
export const getItemsById = () => {
    const userId = JSON.parse(localStorage.getItem('userData'))._id;
    return axios.post(`/api/getItemById`,{_id: userId}, { withCredentials: true });
};

export const addProduct = (productData) => {
    return axios.post('/api/addProduct', productData, { withCredentials: true });
};

export const updateProduct = (productData) => {
    return axios.put(`/api/updateProduct`, productData, { withCredentials: true });
};

export const deleteProduct = (productId) => {
    return axios.delete(`/api/deleteProduct`, { data: { id: productId }, withCredentials: true });
};

export const updateUserCart = (cartData) => {
    return axios.post(`/api/updateUserCart`, cartData, { withCredentials: true });
};

export const getCartData = (userId) => {
    return axios.get(`/api/getCartData/${userId}`, { withCredentials: true });
};

export const buyProductsFromCart = () => {
    const userId = JSON.parse(localStorage.getItem('userData'))._id;
    return axios.put(`/api/buyProducts`,{id: userId}, { withCredentials: true });
};
