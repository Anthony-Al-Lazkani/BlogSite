import React from "react";
import "./SignUp.css";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";



function SignUp() {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const togglePasswordVisibility1 = () => {
        setPasswordVisible1(!passwordVisible1);
    };
    return(
        <div className="Container-SignUp">
            <div className="SignUpContainer">
                <div className="title">
                    <h1>Sign Up</h1>
                    <div className="Underline-SignUp"></div>
                </div>


                <form className="SignUp-Form">
                    <div className="Icon">
                        <FaUser />
                    </div>
                    <input type="text" required maxLength={20} placeholder="Username"/>
                </form>


                <form className="SignUp-Form">
                    <div className="Icon">
                        <FiMail />
                    </div>
                    <input type="email" required maxLength={40} placeholder="Email"/>
                </form>


                <form className="SignUp-Form">
                    <div className="Icon">
                        {passwordVisible ? (
                                    <BsEye onClick={togglePasswordVisibility} />
                                ) : (
                                    <BsEyeSlash onClick={togglePasswordVisibility} />
                                )}
                    </div>
                    <input type={passwordVisible ? 'text' : 'password'} required maxLength={50} placeholder="Password" minLength={8}/>
                </form>


                <form className="SignUp-Form">
                    <div className="Icon">
                        {passwordVisible1 ? (
                                    <BsEye onClick={togglePasswordVisibility1} />
                                ) : (
                                    <BsEyeSlash onClick={togglePasswordVisibility1} />
                                )}
                    </div>
                    <input type={passwordVisible1 ? 'text' : 'password'} required maxLength={50} placeholder="Confirm Password" minLength={8}/>
                </form>

                <div className="LoginLink">
                    <p>Already a Member  ? <span><Link to='/Login'>Login</Link></span></p>
                </div>

                <div className="SignUpButton">
                    <button>Sign Up</button>
                </div>


                    
            </div>
        </div>
    )
}

export default SignUp