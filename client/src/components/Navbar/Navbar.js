import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/why-thg">Why THG?</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </nav>
    )
};

export default Navbar;

