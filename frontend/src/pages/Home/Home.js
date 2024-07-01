import React from "react";
import './Home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Photo1 from '../../Images/hi3.png';

function Home() {
    const history = useNavigate();
    const goToBlogs = () => {
        history('/Blogs');
    };
    const goToLogin = () => {
        history('/Login');
    };
    const goToReviews = () => {
        history('/reviews');
    };
    const goToContactUs = () => {
        history('/Contact');
    };

    return (
        <>
            <section className="Front-Page">
                <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${Photo1})` }}>
                    </div>
                </div>
                <div className="Front-Page-Content">
                    <h1 className="Font-Page-Header-Text">Your Story. Your Community. Your Voice.</h1>
                    {/* <p>Join a vibrant community where your stories come to life. Explore diverse perspectives, engage in meaningful discussions, and share your voice with the world.
                    </p> */}
                    {/* <div className= "button-container">
                        <button type="button" onClick={goToLogin}><span></span>Login</button>
                        <button type="button" onClick={goToBlogs}><span></span>Add A Blog</button>
                        <button type="button" onClick={goToReviews}><span></span>Look At Review</button>
                        <button type="button" onClick={goToContactUs}><span></span>Contact Us</button>

                    </div> */}
                </div>
            </section>

            <section className="Services">
                <h1>Services We Offer</h1>
                <div className="Row">
                    <div className="Services-Col">
                        <h3>Create a blog</h3>
                        <p>Share your unique perspectives, receive valuable feedback, and engage with like-minded individuals. It's a great way to grow personally and professionally while contributing to a vibrant community of writers.
                        </p>
                    </div>
                    <div className="Services-Col">
                        <h3>Explore Blogs</h3>
                        <p>Exploring blogs on our platform lets you discover diverse perspectives and gain new insights. Engage with a wide range of topics, connect with passionate writers, and expand your knowledge. It's a great way to stay informed, inspired, and connected with a vibrant community.
                        </p>
                    </div>
                    <div className="Services-Col">
                        <h3>Give us your feedback</h3>
                        <p>Your feedback is valuable to us! Please share your thoughts and suggestions to help us improve our platform and better serve your needs. We appreciate hearing from you and strive to create an exceptional experience for our community.</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h1>Have questions, suggestions, or feedback? We'd love to hear from you! <br />Feel free to reach out to our team by pressing the button below !</h1>
                <Link to="/ContactUs"><button>CONTACT US</button></Link>
            </section>
        </>
    );
}

export default Home;
