import React from "react";
import "./Login.css"
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from "react";



function Login() {
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


                <div className="inputBox">
                    <div className="Input">
                        <input type="text" placeholder="Username" required maxLength={35} />
                    </div>



                    <div className="Input">
                        <input type={passwordVisible ? 'text' : 'password'} placeholder="Password" required />
                        <div className="Icons">
                            {passwordVisible ? (
                                    <BsEye onClick={togglePasswordVisibility} />
                                ) : (
                                    <BsEyeSlash onClick={togglePasswordVisibility} />
                            )}
                        </div>
                    </div>
                </div>


                <div className="Remember-Forgot">
                    <label> <input type="checkbox" /> Remember me </label>
                </div>

                
            </div>
        </div>
    )
}

export default Login