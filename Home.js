import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/styles.css";
 // Updated CSS file

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to Online Retailer Management System</h1>
            <button onClick={() => navigate('/user-login')}>User Login</button>
            <button onClick={() => navigate('/retailer-login')}>Retailer Login</button>
            <button onClick={() => navigate('/user-register')}>User Register</button>
            <button onClick={() => navigate('/retailer-register')}>Retailer Register</button>
            <button onClick={() => navigate('/browse-products')}>Browse Products</button>
            <button onClick={() => navigate('/view-cart')}>View Cart</button>
        </div>
    );
};

export default Home;