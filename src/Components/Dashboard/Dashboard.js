import React from 'react';
import Error from '../Error/Error';
import Navbar from '../Navbar/Navbar';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';
import SellerDashboard from './SellerDashboard/SellerDashboard';

const Dashboard = () => {
    let Dashboard = '';
    if (localStorage.getItem('role') === 'admin') {
        Dashboard = (
            <AdminDashboard></AdminDashboard>
        )
    }
    else if (localStorage.getItem('role') === 'customer') {
        Dashboard = (
            <CustomerDashboard></CustomerDashboard>
        )
    }
    else if (localStorage.getItem('role') === 'seller') {
        Dashboard = (
            <SellerDashboard></SellerDashboard>
        )
    }
    // else if (localStorage.getItem('role') === 'service') {
    //     Dashboard = (
    //         <ServiceDashboard></ServiceDashboard>
    //     )
    // }
    else {
        Dashboard = (
            <Error></Error>
        )
    }
    return (
        <div>
            <Navbar></Navbar>
            {Dashboard}
        </div>
    );
};

export default Dashboard;