import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../Navbar/Navbar';

const AddProducts = () => {
    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        category: 'Phone',
        price: '',
        details: '',
        sellerName: 'Kaushik Biswas',
        sellerId: '1',
        sellerPhone: '01749555864',
        errors: []
    })

    const handelChange = (event) => {
        event.persist();
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    };
    const imageInputRef = React.useRef();

    const [image, setImage] = useState({
        featuredImages: '',
        errors: []
    });

    const [singleImage, setSingleImage] = useState({
        image: '',
        errors: []
    });
    const handelSingleImage = (event) => {
        event.persist();
        setSingleImage({ ...singleImage, image: event.target.files[0] });
    }
    // console.log(singleImage);
    const history = useNavigate();
    const handelImage = (event) => {
        event.persist();
        setImage({ ...image, featuredImages: event.target.files });
    }
    const Submit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < image.featuredImages.length; i++) {
            formData.append(`featuredImages[${i}]`, image.featuredImages[i])
        }
        console.log(formData)
        formData.append("name", product.name)
        formData.append("quantity", product.quantity)
        formData.append("category", 'Phone')
        formData.append("price", product.price)
        formData.append("details", product.details)
        formData.append("sellerName", 'Kaushik Biswas')
        formData.append("sellerPhone", '01749555864')
        formData.append("sellerId", '1')
        formData.append("image", singleImage.image)

        axios.post(`/api/addProduct`, formData).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setProduct({ ...product, errors: response.data.validation_errors });
                setImage({ ...image, errors: response.data.validation_errors })
                setSingleImage({ ...singleImage, errors: response.data.validation_errors })
                swal("Warning", "Validation Error!", "error");
            } else {
                const url = `/productList`;
                history(url);
                swal("Success", response.data.success, "success");
                setProduct({
                    name: '',
                    quantity: '',
                    category: 'Phone',
                    price: '',
                    details: '',
                    sellerName: 'Kaushik Biswas',
                    sellerPhone: '01749555864',
                    sellerId: '1',
                    errors: []
                });
                setImage({
                    featuredImages: '',
                    errors: []
                });
                setSingleImage({
                    image: '',
                    errors: []
                });
                imageInputRef.current.value = "";
            }
        });
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
                <div className='p-5' style={{ background: "#FFE9A0", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}>
                    <h5 className='mb-4 text-danger fw-bold'>Add Product</h5>
                    <form onSubmit={Submit} encType='multiple/form-data'>

                        <div className="row">
                            <div className="col-md-6">

                                <label htmlFor="name" className='fw-bold'>Product Name</label>
                                <input value={product.name} type="text" placeholder='Name' name="name" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.name}</span>

                                <label htmlFor="quantity" className='fw-bold'>Product Quantity</label>
                                <input value={product.quantity} type="number" placeholder='Quantity' name="quantity" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.quantity}</span>

                                <label htmlFor="details" className='fw-bold'>Product Details</label>
                                <textarea rows="3" cols="50" value={product.details} type="text" placeholder='Details' name="details" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.details}</span>


                            </div>
                            <div className="col-md-6">

                                <label htmlFor="price" className='fw-bold'>Product Price</label>
                                <input value={product.price} type="number" placeholder='Price' name="price" className='form-control my-2' onChange={handelChange} />
                                <span className='d-flex' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.price}</span>

                                <label htmlFor="image" className='fw-bold'>Product Image</label>
                                <input onChange={handelSingleImage} type="file" className='form-control my-2' name='image' />
                                <span className=' my-2' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{singleImage.errors.image}</span>

                                <label htmlFor="featuredImages[]" className='fw-bold'>Featured Images</label>
                                <input ref={imageInputRef} multiple onChange={handelImage} type="file" className='form-control my-2' name='featuredImages[]' />
                                <span className='my-2' style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{image.errors.featuredImages}</span>
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

export default AddProducts;