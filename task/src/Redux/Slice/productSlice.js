import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productData: [],
    cartData: {},
    cartCount: 0
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setAllShopItems(state, action) {
            state.productData = action.payload.items;
            state.cartCount = action.payload.cartCount;
        },//setting all get data to shop page
        addProductInList(state, action) {
            state.productData.push(action.payload);
        }, //when adding using modal to sell page
        updateProductInList(state, action) {
            state.productData = state.productData.map((product) =>
                product._id === action.payload._id ? action.payload : product
            );
        }, //when updating using modal to sell page
        deleteProductFromList(state, action) {
            state.productData = state.productData.filter((product) => product._id !== action.payload);
        },//when deleting using confirmation to sell page
        setProducts(state, action) {
            state.productData = action.payload.items;
        },//setting data to sell page
        setItemQuantity(state, action) {
            state.cartCount = action.payload? state.cartCount -=action.payload :state.cartCount +=1;
        }, //updating cart count to cart when add to cart button is clicked
        setItem(state, action) {
            state.cartData = action.payload.cartData? action.payload.cartData : {};
        }, //setting data in cart page on load
        updateCartData(state, action) {
            if (state.cartData._id === action.payload.cartData._id) {
                state.cartData.items = action.payload.cartData.items;
            }
        }, //updating cart quantity in cart when add to cart button/increment/decrement is clicked
    },
});

export const { setAllShopItems,addProductInList,updateProductInList,deleteProductFromList,setProducts,setItemQuantity,setItem,updateCartData } = productSlice.actions;

export default productSlice.reducer;