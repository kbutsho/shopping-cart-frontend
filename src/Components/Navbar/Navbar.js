// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
//import swal from 'sweetalert';
import { getTotals } from '../../Redux/Features/cartSlice';

const Navbar = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]
    );
    // const history = useNavigate();
    // const logout = (event) => {
    //     event.preventDefault();
    //     const data = {
    //         token: localStorage.getItem('token')
    //     };
    //     axios.post('/api/logout', data)
    //         .then(response => {
    //             if (response.data.status === 'success') {
    //                 localStorage.removeItem('token', response.data.token);
    //                 localStorage.removeItem('role', response.data.role);
    //                 localStorage.removeItem('id', response.data.id);
    //                 localStorage.removeItem('name', response.data.name);
    //                 localStorage.removeItem('email', response.data.email);
    //                 localStorage.removeItem('phone', response.data.phone);
    //                 swal("Success", response.data.message, "success");
    //                 const url = `/home`;
    //                 history(url);
    //             } else {
    //                 swal("Warning", "Something wrong", "error");
    //             }
    //         })
    // }
    return (
        <div style={{ margin: "65px 0" }}>
            <nav className="navbar navbar-expand-lg py-3 navbar-light bg-dark fixed-top" >
                <div className="container">
                    <a href="/" style={{ fontSize: '20px' }} className='fw-bold text-white text-decoration-none'><img style={{ margin: "0 15px 0 0", width: '15%' }} src='https://cdn-icons-png.flaticon.com/128/4290/4290854.png' alt='' /> <span className=''>Shopping Cart</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link fw-bold text-white text-uppercase" to="/">Home</Link>
                            <Link className="nav-link fw-bold text-white text-uppercase" to="/productList">Product List</Link>
                            {/* <Link className="nav-link fw-bold text-white text-uppercase" to="/addProduct">Add Product</Link> */}

                            {/* <Link className="nav-link fw-bold text-white text-uppercase" to="/dashboard">Dashboard</Link> */}
                            {/* <Link className="nav-link fw-bold text-danger text-uppercase" to="/logout">Logout</Link> */}
                            {/* {
                                localStorage.getItem('token') ? <span onClick={logout} className="nav-link fw-bold text-danger text-uppercase" style={{ cursor: "pointer" }}>Logout</span> : <Link className="nav-link fw-bold text-white text-uppercase" to="/login">Login</Link>

                            } */}
                            <Link className=" d-flex nav-link fw-bold text-white text-uppercase" to="/cart">
                                <FontAwesomeIcon icon={faCartShopping} style={{ height: '25px', color: "yellow" }} />
                                <span className="bag-quantity">
                                    <span>{cart.cartTotalQuantity}</span>
                                </span>
                            </Link>





                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;