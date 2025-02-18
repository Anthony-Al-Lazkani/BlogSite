import React, { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import "./Navbar.css";
import Notifications from "../Notification/Notification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUserPlus } from "react-icons/fa";

import axios from 'axios';

function Navbar1() {
    const navRef = useRef();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);



    


    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const isLoggedIn = !!localStorage.getItem('authToken');

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    useEffect(() => {
        const fetchNotifications = () => {
            const pendingFriendsString = localStorage.getItem('friendsRequest');
            const pendingFriends = JSON.parse(pendingFriendsString);
            setNotificationCount(pendingFriends ? pendingFriends.length : 0);
        };

        if (isLoggedIn) {
            fetchNotifications();
        }
    }, [isLoggedIn]);

    return (
        <header>
            <h3>BLOGAWAY</h3>
            <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/Blogs">Blogs</a>
                <a href="/Contact">Contact Us</a>
                {!isLoggedIn && <a href="/Login">Login</a>}
                {isLoggedIn && (
                    <>
                        <a href="/Profile" id="Profile-Icon"><VscAccount/></a>
                        <button onClick={toggleNotifications} className="AddFriend"><FaBell />{notificationCount}</button>
                        <a href="/addFriend"><FaUserPlus /></a> 
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
            {showNotifications && <Notifications onNotificationCount={setNotificationCount} />}
        </header>
    );
}

export default Navbar1;
