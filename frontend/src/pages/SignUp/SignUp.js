import React from "react";
import "./SignUp.css";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignUp() {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const  handleSubmit = (e)=>{
        e.preventDefault()
            axios.post("http://localhost:4000/api/articles/createUser",{ username, email, password})
            .then(result => {console.log(result)
                if(result.data.message === "Create user successful"){
                    navigate('/')
                }
                else if(result.data.message === "Invalid parameter"){
                    alert("Invalid parameters")
                }
                else{
                    alert("Sign Up failed")
                }
            })
            .catch(err=> console.log(err)) 
        }

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

                <form onSubmit={handleSubmit}>
                <div className="SignUp-Form">
                    <div className="Icon">
                        <FaUser />
                    </div>
                    <input type="text" onChange={(e)=>{setUsername(e.target.value)}} required maxLength={20} placeholder="Username"/>
                </div>


                <div className="SignUp-Form">
                    <div className="Icon">
                        <FiMail />
                    </div>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} required maxLength={40} placeholder="Email"/>
                </div>


                <div className="SignUp-Form">
                    <div className="Icon">
                        {passwordVisible ? (
                                    <BsEye onClick={togglePasswordVisibility} />
                                ) : (
                                    <BsEyeSlash onClick={togglePasswordVisibility} />
                                )}
                    </div>
                    <input type={passwordVisible ? 'text' : 'password'} onChange={(e)=>{setPassword(e.target.value)}} required maxLength={50} placeholder="Password" minLength={1}/>
                </div>


                <div className="SignUp-Form">
                    <div className="Icon">
                        {passwordVisible1 ? (
                                    <BsEye onClick={togglePasswordVisibility1} />
                                ) : (
                                    <BsEyeSlash onClick={togglePasswordVisibility1} />
                                )}
                    </div>
                    <input type={passwordVisible1 ? 'text' : 'password'} required maxLength={50} placeholder="Confirm Password" minLength={1}/>
                </div>

                <div className="LoginLink">
                    <p>Already a Member  ? <span><Link to='/Login'>Login</Link></span></p>
                </div>

                <div className="SignUpButton">
                    <button>Sign Up</button>
                </div>
                </form>


                    
            </div>
        </div>
    )
}

export default SignUp