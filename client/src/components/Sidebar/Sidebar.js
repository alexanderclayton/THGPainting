import React from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar/Sidebar.css';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <li><Link className="sidebar-link" to="/userpage">Userpage</Link></li>
            <li><Link className="sidebar-link" to="/all-projects">All Projects</Link></li>
            <li><Link className="sidebar-link" to="/all-clients">All Clients</Link></li>
        </nav>
    )
};

export default Sidebar;

