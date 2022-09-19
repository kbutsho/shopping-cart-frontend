import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const history = useNavigate();
    const [error, setError] = useState([]);
    const [login, setLogin] = useState({
        email: '',
        password: '',
        errors: []
    });

    const Cross = (event) => {
        event.persist();
        setError('');
    }
    const handelChange = (event) => {
        event.persist();
        setLogin({ ...login, [event.target.name]: event.target.value });
    };
    const loginSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: login.email,
            password: login.password
        };
        axios.post(`/api/login`, data).then(response => {
            if (response.data.validation_errors) {
                setLogin({ ...login, errors: response.data.validation_errors });
            } else {
                if (response.data.status === "notFound") {
                    setError(response.data.message);
                    setLogin({
                        email: '',
                        password: '',
                        errors: []
                    });
                } else {
                    if (response.data.status === "success") {
                        localStorage.setItem('token', response.data.token,);
                        localStorage.setItem('role', response.data.role);
                        localStorage.setItem('id', response.data.id);
                        localStorage.setItem('email', response.data.email);
                        localStorage.setItem('name', response.data.name);
                        localStorage.setItem('phone', response.data.phone);
                        swal("Done", "Login Successful!", "success");
                        history("/home");

                    } else {
                        setError(response.data.pending_error);
                        setLogin({
                            email: '',
                            password: '',
                            errors: []
                        });
                    }
                }
            }
        })

    }
    return (
        <div className='login-bg'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6" >
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                            <div className="login-form-area">
                                <h2 className='mb-4 text-white'>Login</h2>
                                {
                                    error.length > 0 ? <div className='mb-3 text center d-flex' style={{ background: "white", padding: '10px 10px 5px', borderRadius: '5px', }}>
                                        <h6 style={{ color: "red", borderRadius: '5px', fontSize: '12px' }} className='fw-bold me-2'>{error}
                                        </h6>
                                        <FontAwesomeIcon onClick={Cross} className='ms-auto' icon={faXmark} style={{ height: '16px', cursor: 'pointer' }} />
                                    </div> : null
                                }
                                <form onSubmit={loginSubmit}>
                                    <div className="my-3">
                                        <div>
                                            <input style={{ width: '300px' }} value={login.email} onChange={handelChange} name="email" type="text" placeholder=' Email' className='form-control' />
                                        </div>
                                        <span style={{
                                            color: "white", fontSize: "12px", fontWeight: "bold"
                                        }}>{login.errors.email}</span>

                                    </div>


                                    <div className=" my-3">
                                        <div>
                                            <input style={{ width: '300px' }} value={login.password} onChange={handelChange} name="password" type="password" placeholder=' Password' className='form-control' />
                                        </div>
                                        <span style={{
                                            color: "white", fontSize: "12px", fontWeight: "bold"
                                        }}>{login.errors.password}</span>
                                    </div>

                                    <div className="my-3 d-flex">

                                        <div >
                                            <div  >
                                                <span style={{ color: "white", fontWeight: "bold" }}>New user?</span>
                                            </div>
                                            <div>
                                                <Link className="fw-bold login-link" to="/registration">Registration here</Link>
                                            </div>
                                        </div>
                                        <div className='ms-auto'>
                                            <button type='submit' className='btn btn-primary mt-1' >Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;