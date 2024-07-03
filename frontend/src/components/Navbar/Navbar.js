import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"

function Navbar1() {
    const navRef = useRef();
    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('friends')
        navigate('/login'); 
    };

    const isLoggedIn = !!localStorage.getItem('authToken');

    return (
        <header>
            <h3>GROUP A</h3>
            <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/Blogs">Blogs</a>
                <a href="/Contact">Contact Us</a>
                {!isLoggedIn && <a href="/Login">Login</a>}
                {isLoggedIn && (
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                )}
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar1;
