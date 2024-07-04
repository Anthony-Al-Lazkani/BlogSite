import { useRef, useState } from "react";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import "./Navbar.css"
import Notifications from "../Notification/Notification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar1() {
    const navRef = useRef();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    

    const isLoggedIn = !!localStorage.getItem('authToken');

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <header>
            <h3>GROUP A</h3>
            <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/Blogs">Blogs</a>
                <a href="/Contact">Contact Us</a>
                {!isLoggedIn && <a href="/Login">Login</a>}
                {isLoggedIn && (
                    <>
                        <a href="/Profile" id="Profile-Icon"><VscAccount/></a>
                        <button onClick={toggleNotifications} className="btn btn-secondary"><FaBell /></button>
                        {/* <a href="/addFriend">add friends</a> */}
                    </>
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
            {showNotifications && <Notifications />}
        </header>
    );
}

export default Navbar1;
