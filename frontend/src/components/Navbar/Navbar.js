import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"

function Navbar1() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);

	
	};

	const navigate = useNavigate();

    const handleLogout = () => {
        // Assuming you clear the authentication token stored in localStorage
        localStorage.removeItem('authToken');
        
        // Redirect to login page or home page after logout
        navigate('/login'); 
    };

	return (
		<header>
			<h3>GROUP A</h3>
			<nav ref={navRef}>
				<a href="/">Home</a>
				<a href="/Blogs">Blogs</a>
				<a href="/Contact">Contact Us</a>
				<a href="/Login">Login</a>
				<button onClick={handleLogout} className="btn btn-primary">Logout</button>
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