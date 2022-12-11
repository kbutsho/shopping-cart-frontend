import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home/Home';
import Registration from './Components/Registration/Registration';
import Error from './Components/Error/Error';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CheckOut from './Components/CheckOut/CheckOut';
import { ToastContainer } from 'react-toastify';
import Cart from './Components/Cart/Cart';
import "react-toastify/dist/ReactToastify.css"
import Products from './Components/Products/Products';
//import AddProducts from './Components/Products/AddProducts';
import ProductList from './Components/Products/ProductList';
import UpdateProduct from './Components/Products/UpdateProduct';
//import Category from './Components/Category/Category';
//import File from './Components/File/File';


axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


const App = () => {
  return (
    <div>

      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/products" element={<Products />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/test" element={<Category />}></Route>
        <Route path="/addProduct" element={<AddProducts />} /> */}
        <Route path="/productList" element={<ProductList />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate replace to="/error" />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;