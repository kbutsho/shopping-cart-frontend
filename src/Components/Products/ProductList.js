import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import swal from 'sweetalert';
import Navbar from '../Navbar/Navbar';
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const ProductList = () => {
    const [product, setProduct] = useState([])


    useEffect(() => {
        axios.get('/api/allProducts')
            .then(res => setProduct(res.data))
    }, []);
    const history = useNavigate();

    const deleteProduct = async (event, id) => {
        if (localStorage.getItem('token')) {
            const response = await axios.delete(`/api/deleteProduct/${id}`);
            console.log(response);
            if (response.data.status === 'success') {
                window.location.reload(false);
                swal("Success", response.data.message, "success");
            }
        }else{
            swal("Login first", "warning!", "warning");
            history('/productList');
        }


    };


    // update product

    const details = (id) => {
        const url = `/productDetails/${id}`;
        history(url);
    }
    const update = (id) => {
        const url = `/updateProduct/${id}`;
        history(url);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div style={{ background: "white", minHeight: "90vh" }}>
                <div className="container">
                    <h3 className="py-4 fw-bold text-uppercase">All Products</h3>
                    <div className="row">
                        {
                            product.length === 0 ?
                                <div className='d-flex justify-content-center' style={{ marginTop: "200px", minHeight: "90vh" }}>
                                    <PulseLoader className="App" size={10} color={"red"} />
                                    <PulseLoader className="App" size={10} color={"red"} />
                                </div> :
                                <table className="table table-striped table-hover" style={{ background: "#FFE9A0" }}>
                                    <thead className="bg-dark text-white text-center">
                                        <tr >
                                            <th >Product Id</th>
                                            <th >Product Name</th>
                                            <th >Seller Name</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    {
                                        product.map(product =>
                                            <tbody className="text-center">
                                                <tr>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.sellerName}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.price}</td>
                                                    <td>
                                                        <img src={`https://laravel-shopping-cart.kbutsho.com/Upload/ProductPhotos/` + product.image} alt="img" height="50px" width="50px" />
                                                    </td>


                                                    <td>
                                                        <button className="mt-2 btn btn-sm btn-primary" onClick={() => details(product.id)}>Details</button>
                                                        <button onClick={() => update(product.id)} className="mt-2 mx-2 btn btn-sm btn-success" >Update</button>
                                                        <button className="mt-2 btn btn-sm btn-danger " onClick={(event) => deleteProduct(event, product.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </table>
                        }
                    </div>
                </div>

            </div>


        </div>
    );
};

export default ProductList;