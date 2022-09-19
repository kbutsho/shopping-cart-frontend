import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../Navbar/Navbar';

const UpdateProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        price: '',
        details: '',
        errors: []
    })

    const { id } = useParams();
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        axios.get(`/api/productDetails/${id}`)
            .then(res => setProductDetails(res.data))
    }, [id]);

    const handelChange = (event) => {
        event.persist();
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    };
    const history = useNavigate();
    const Submit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("id", productDetails.id)
        formData.append("name", product.name || productDetails.name)
        formData.append("quantity", product.quantity || productDetails.quantity)
        formData.append("price", product.price || productDetails.price)
        formData.append("details", product.details || productDetails.details)

        axios.post(`/api/updateProduct`, formData).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setProduct({ ...product, errors: response.data.validation_errors });

                swal("Warning", "Validation Error!", "error");
            } else {
                const url = `/productList`;
                history(url);
                swal("Success", response.data.success, "success");
            }
        });
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
                <div className='p-5' style={{ background: "#FFE9A0", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}>
                    <h5 className='mb-4 text-danger fw-bold'>Update Product</h5>
                    <form onSubmit={Submit} >

                        <div className="row">
                            <div className="col-md-6">

                                <label htmlFor="name" className='fw-bold'>Product Name</label>
                                <input defaultValue={productDetails.name} type="text" placeholder='Name' name="name" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.name}</span>

                                <label htmlFor="quantity" className='fw-bold'>Product Quantity</label>
                                <input defaultValue={productDetails.quantity} type="number" placeholder='Quantity' name="quantity" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.quantity}</span>

                                <label htmlFor="price" className='fw-bold'>Product Price</label>
                                <input defaultValue={productDetails.price} type="number" placeholder='Price' name="price" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.price}</span>




                            </div>
                            <div className="col-md-6">
                                <label htmlFor="details" className='fw-bold'>Product Details</label>
                                <textarea rows="5" cols="50" defaultValue={productDetails.details} type="text" placeholder='Details' name="details" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.details}</span>

                                <div className='d-flex justify-content-end'>
                                    <button className='btn btn-sm btn-primary mt-2'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;