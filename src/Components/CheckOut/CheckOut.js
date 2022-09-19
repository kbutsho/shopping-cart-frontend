
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { clearCart, getTotals } from '../../Redux/Features/cartSlice';
import Navbar from '../Navbar/Navbar';

const CheckOut = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotals());
      }, [cart, dispatch]
      );
      const history = useNavigate();
      const placeOrder =()=>{

        dispatch(clearCart());
        history("/home");
        swal("Done", "Order place successfully!", "success");
      }
    return (
        <div>
        <Navbar></Navbar>
            <div className='container  w-50' style={{ marginTop: "100px" }}>
            <div>
                <h2 className='mb-4'>Order Summery</h2>
                <table className="table table-striped table-hover" >
                    <thead className="bg-dark text-white text-center">
                        <tr >
                            <th >Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>


                        </tr>
                    </thead>
                    {
                        cart.cartItems.map(item =>

                            <tbody className="text-center">

                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.cartQuantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.cartQuantity}</td>
                                </tr>
                            </tbody>
                        )
                    }

                </table>
                <div className='d-flex'>
                    <div>
                        <span className='fw-bold'>Sub Total = </span>
                        <span className='fw-bold ms-2 '> {cart.cartTotalAmount}</span>
                    </div>
                    <button className='ms-auto btn btn-sm btn-primary' onClick={()=> placeOrder()}>Place order</button>
                </div>
            </div>
        </div> 
        </div>
    );
};

export default CheckOut;