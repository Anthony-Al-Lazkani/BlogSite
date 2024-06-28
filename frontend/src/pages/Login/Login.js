import React from "react";
import "./Login.css"
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";



function Login() {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
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


                <form className="Login-Form">
                    <div className="Icon">
                        <FaUser />
                    </div>
                    <input type="text" required maxLength={20} placeholder="Username"/>
                </form>


                <form className="Login-Form">
                    <div className="Icon">
                        {passwordVisible ? (
                                    <BsEye onClick={togglePasswordVisibility} />
                                ) : (
                                    <BsEyeSlash onClick={togglePasswordVisibility} />
                                )}
                    </div>
                    <input type={passwordVisible ? 'text' : 'password'} required maxLength={50} placeholder="Password" minLength={8}/>
                </form>

                <div className="RegisterLink">
                    <p>Don't have an account ? <span><Link to='/'>Sign Up</Link></span></p>
                </div>

                <div className="LoginButton">
                    <button>Login</button>
                </div>


                    
            </div>
        </div>
    )
}

export default Login