import React from "react";
import "./Login.css"
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/articles/signIn", { username, password });
            if (response.data.message === "Sign in successful") {
                localStorage.setItem('authToken', response.data.token);
                navigate('/');
                setUsername(''); // Clear username field
                setPassword(''); // Clear password field
            } else if (response.data.message === "Invalid username or password") {
                alert("Wrong username or password");
            } else {
                alert("Failed to sign in");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert("Failed to sign in. Please try again.");
        }
    };
    


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return(
        <div className="Container">
            <div className="LoginContainer">
                <div className="title">
                    <h1>Login</h1>
                    <div className="Underline-Login"></div>
                </div>

                <form onSubmit={handleSubmit}>
                <div className="Login-Form">
                    <div className="Icon">
                        <FaUser />
                    </div>
                    <input type="text" onChange={(e)=>{setUsername(e.target.value)}} required maxLength={20} placeholder="Username"/>
                </div>


                <div className="Login-Form">
                    <div className="Icon">
                        {passwordVisible ? (
                                    <BsEye onClick={togglePasswordVisibility} />
                                ) : (
                                    <BsEyeSlash onClick={togglePasswordVisibility} />
                                )}
                    </div>
                    <input type={passwordVisible ? 'text' : 'password'} onChange={(e)=>{setPassword(e.target.value)}} required maxLength={50} placeholder="Password" minLength={1}/>
                </div>

                <div className="RegisterLink">
                    <p>Don't have an account ? <span><Link to='/SignUp'>Sign Up</Link></span></p>
                </div>

                <div className="LoginButton">
                    <button type="submit">Login</button>
                </div>
                </form>


                    
            </div>
        </div>
    )
}

export default Login