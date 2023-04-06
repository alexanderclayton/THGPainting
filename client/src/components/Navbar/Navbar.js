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
        <nav className="navbar">
            <li><Link className="navbar-link" to="/">Home</Link></li>
            <li><Link className="navbar-link" to="/about">About Us</Link></li>
            <li><Link className="navbar-link" to="/why-thg">Why THG?</Link></li>
            <li><Link className="navbar-link" to="/contact">Contact Us</Link></li>
            {authServiceInstance.loggedIn() || <li><Link className="navbar-link" to="/login">Login</Link></li>}
            
            {authServiceInstance.loggedIn() && (
                <li><button className="logout" onClick={handleLogout}>Logout</button></li>
            )}
        </nav>
    )
};

export default Navbar;

