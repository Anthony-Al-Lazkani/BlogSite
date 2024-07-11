import {React , useState} from "react";
import './Contact.css'
import { FaPhone } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import axios from "axios";

function Contact() {

    const [email, setEmail] = useState('');

    const  handleSubmit = (e)=>{
        e.preventDefault()
            axios.post("http://localhost:4000/api/articles/contact_us",{email})
            .then(result => {console.log(result)})
            .catch(err=> console.log(err)) 
        }
    

    return(
        <div className="ContactContainer">
            <div className="ContactRectangle">
                <div className="LeftSide">
                    <div className="LeftSide-Title">
                        <h1>Contact Us</h1>
                    </div>

                    <div className="InfoContainer">
                        <div className="InfoContainerIcon">
                            <a href="tel: +961-78-808-441"><FaPhone /></a>
                        </div>
                        <h1>+961 78 808 441</h1>
                    </div>



                    <div className="InfoContainer">
                        <div className="InfoContainerIcon">
                            <a href="mailto:anthonylazkani.22@gmail.com"><IoMailOutline /></a>
                        </div>
                        <h1>groupa@gmail.com</h1>
                    </div>



                    <div className="InfoContainer">
                        <div className="InfoContainerIcon">
                            <a href="/Contact"><FaInstagram /></a>
                        </div>
                        <h1>Group_A</h1>
                    </div>



                    <div className="InfoContainer">
                        <div className="InfoContainerIcon">
                            <a href="/Contact"><FaLinkedin /></a>
                        </div>
                        <h1>Group A</h1>
                    </div>
                </div>
                <div className="RightSide">
                    <div className="RightSideTitle">
                        <h1>Feel Free to reach out !</h1>
                    </div>

                    <form className="Contact-Form">
                        <div className="Icon-Contact">
                            <FiMail />
                        </div>
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} required maxLength={40} placeholder="Email"/>
                    </form>


                    <form className="Contact-Form">
                        <div className="Icon-Contact">
                            <FaUser />
                        </div>
                        <input type="text" required maxLength={30} placeholder="Name"/>
                    </form>


                    <select className="Selection-Form">
                        <option value="Feedback" >
                        Feedback
                        </option>
                        <option value="ReportAPlace">
                        Report a User
                        </option>
                        <option value="ReportAProblem">
                        Report an Issue
                        </option>
                        <option value="ReportAbuse">
                        Report a Scam
                        </option>
                    </select>


                    <textarea className="Box"
                        rows="4"
                        cols="45"
                        maxlength="300"
                        placeholder="Max Allowed Characters: 300">
                    </textarea>


                    <button onClick={handleSubmit} className="Contact-Button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Contact