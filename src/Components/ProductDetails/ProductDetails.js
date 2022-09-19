import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../Redux/Features/cartSlice';
import Navbar from '../Navbar/Navbar';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    useEffect(() => {
        axios.get(`/api/featuredImages/${id}`)
            .then(res => setImages(res.data))
    }, [id]);
    useEffect(() => {
        axios.get(`/api/productDetails/${id}`)
            .then(res => setProductDetails(res.data))
    }, [id]);
    const dispatch = useDispatch();
    const handelAddToCart = (product) => {
        dispatch(addToCart(product));
    }
    return (
        <div>
            <Navbar></Navbar>



            <div className='container' style={{ background: "lightGray", minHeight: '530px', margin: '120px auto 20px' }}>
                <div className="row">
                    <div className="col-md-6 p-5">
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '300px' }}>
                            <img className='w-100 ' src={`https://laravel-shopping-cart.kbutsho.com/Upload/ProductPhotos/` + productDetails.image} alt="img" />
                        </div>
                        <div className="row mt-3">
                            {
                                images.slice(0, 3).map(image =>
                                    <div className='col-md-4 my-2 text-center' key={image.id}>
                                        <img className='featuredImages' style={{ height: '100px', }} src={`https://laravel-shopping-cart.kbutsho.com/Upload/FeaturedPhotos/` + image.image} alt="img" />
                                    </div>
                                )
                            }
                        </div>

                    </div>
                    <div className="col-md-6 p-4 d-flex align-items-center" style={{ minHeight: '450px' }}>
                        <div>
                            <h4 className='text-uppercase text-danger fw-bold my-3'>{productDetails.name}</h4>
                            <p><i className="text-warning ms-auto fa-solid fa-star-half-stroke my-3">  </i> 41 Reviews</p>
                            <p className='fw-bold my-3'>{productDetails.details}</p>
                            <p className='fw-bold my-3'>Available: {productDetails.quantity}</p>
                            <h4 className='fw-bold my-3 text-danger'>Price: {productDetails.price}</h4>
                            <button onClick={() => handelAddToCart(productDetails)} className='btn btn-primary my-3'>ADD TO CART</button>
                        </div>

                    </div>
                </div>
            </div>
            {/* {productDetails.name}
           {productDetails.details}
           {productDetails.price}
           {productDetails.quantity}
            {
                images.map(image =>
                    <div key={image.id}>
                        <img className='d-flex' style={{ height: '200px' }} src={`http://localhost:8000/Upload/FeaturedPhotos/` + image.image} alt="img" />
                    </div>
                )
            } */}
        </div>
    );
};

export default ProductDetails;