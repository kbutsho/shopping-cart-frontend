import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Features/productsSlice';
import cartReducer from './Features/cartSlice';
const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer
    }
});

export default store;