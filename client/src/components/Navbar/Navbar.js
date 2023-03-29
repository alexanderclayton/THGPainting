import React from 'react';
import { Link } from 'react-router-dom';
import authServiceInstance from '../../utils/auth';
import '../Navbar/Navbar.css';

const Navbar = () => {
    const handleLogout = () => {
        userLogout();
        window.location.href = '/';
    };

    const userLogout = () => {
        authServiceInstance.logout();
        window.location.reload();
    };

    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/why-thg">Why THG?</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            {authServiceInstance.loggedIn() || <li><Link to="/login">Login</Link></li>}
            
            {authServiceInstance.loggedIn() && (
                <li><button onClick={handleLogout}>Logout</button></li>
            )}
        </nav>
    )
};

export default Navbar;

