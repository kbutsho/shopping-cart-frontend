import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import "./Registration.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Registration = () => {

    const history = useNavigate();
    const [duplicate, setDuplicate] = useState([]);
    const [registration, setRegistration] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: '',
        errors: []
    });
    const handelChange = (event) => {
        event.persist();
        setRegistration({ ...registration, [event.target.name]: event.target.value });
    };

    const Cross = (event) =>{
        event.persist();
        setDuplicate('');
    }

    const RegistrationSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: registration.name,
            email: registration.email,
            address: registration.address,
            phone: registration.phone,
            password: registration.password,
            confirmPassword: registration.confirmPassword,
            role: registration.role,
        };
        axios.post(`/api/registration`, data).then(response => {
            if (response.data.validation_errors) {
                setRegistration({ ...registration, errors: response.data.validation_errors });
            } else {

                if (response.data.duplicate) {
                    setDuplicate(response.data.duplicate);
                    setRegistration({
                        email: '',
                        phone: '',
                        name: registration.name,
                        address: registration.address,
                        password: registration.password,
                        confirmPassword: registration.confirmPassword,
                        role: registration.role,
                        errors: []
                    });
                }
                if (response.data.duplicateEmail) {
                    setDuplicate(response.data.duplicateEmail);
                    setRegistration({
                        email: '',
                        phone: registration.phone,
                        name: registration.name,
                        address: registration.address,
                        password: registration.password,
                        confirmPassword: registration.confirmPassword,
                        role: registration.role,
                        errors: []
                    });
                }
                if (response.data.duplicatePhone) {
                    setDuplicate(response.data.duplicatePhone);
                    setRegistration({
                        email: registration.email,
                        phone: '',
                        name: registration.name,
                        address: registration.address,
                        password: registration.password,
                        confirmPassword: registration.confirmPassword,
                        role: registration.role,
                        errors: []
                    });
                }
                else {
                    swal("Done", response.data.success, "success");
                    history("/login");
                }
            }
        });
        console.log(duplicate);
    }
    return (
        <div className='registration-bg'>
            <div className="container d-flex align-items-center" style={{ minHeight: "100vh" }}>
                <div className="form-area my-4">
                    <h2 className='mb-3 text-white'>Registration</h2>
                    {
                        duplicate.length > 0 ? <div className='mb-3 text center d-flex' style={{  background: "white", padding: '10px 10px 5px', borderRadius: '5px' }}>
                         <h6 style={{ color: "red", borderRadius: '5px' }} className='fw-bold'>{duplicate} 
                        </h6>
                        <FontAwesomeIcon onClick={Cross} className='ms-auto'  icon={faXmark} style={{ height: '24px', cursor: 'pointer' }} />
                       
                       
                        </div> : null
                    }
                    <form onSubmit={RegistrationSubmit}>
                        <div className="row">
                            <div className="col-md-6 my-2">
                                <div>
                                    <input value={registration.name} onChange={handelChange} name="name" type="text" placeholder=' Name' className='form-control' />
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.name}</span>
                            </div>
                            <div className="col-md-6 my-2">
                                <div>
                                    <input value={registration.address} onChange={handelChange} name="address" type="text" placeholder=' Address' className='form-control' />
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.address}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 my-2">
                                <div>
                                    <input value={registration.phone} onChange={handelChange} name="phone" type="text" placeholder=' Phone' className='form-control' />
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.phone}</span>
                            </div>
                            <div className="col-md-6 my-2">
                                <div>
                                    <input value={registration.email} onChange={handelChange} name="email" type="text" placeholder=' Email' className='form-control w-100' />
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.email}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6  my-2">
                                <div>
                                    <input value={registration.password} onChange={handelChange} name="password" type="text" placeholder='Password' className='form-control' />
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.password}</span>
                            </div>
                            <div className="col-md-6 my-2">
                                <div>
                                    <input value={registration.confirmPassword} onChange={handelChange} name="confirmPassword" type="text" placeholder='Confirm Password' className='form-control' />
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.confirmPassword}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 my-2">
                                <div>
                                    <select className='form-select' name="role" onChange={handelChange} value={registration.role}>
                                        <option value="">Register As</option>
                                        <option value="customer">Customer</option>
                                        <option value="seller">Seller</option>
                                       
                                    </select>
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.role}</span>
                            </div>
                            <div className="col-md-6 my-2">
                                <div>
                                    <input value={registration.status} name="status" onChange={handelChange} type="text" disabled  className='form-control' />
                                </div>
                                <span style={{
                                    color: "white", fontSize: "12px", fontWeight: "bold"
                                }}>{registration.errors.status}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6  my-2">
                                <div>
                                    <button type='submit' className='btn btn-primary w-100' >Submit</button>
                                </div>
                            </div>
                            <div className="col-md-6" >
                                <div className='' >
                                    <div className="d-flex justify-content-end" >
                                        <span style={{ color: "white", fontWeight: "bold" }}>Have an account?</span>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Link className="fw-bold login-link" to="/login">Please login here</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;