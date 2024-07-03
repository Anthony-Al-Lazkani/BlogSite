import React from "react";
import './Home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import photo from '../../Images/hi3.png'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './scripts';
import './review1'; 
import './review2'; 


function Home() {
    const history = useNavigate();
    const goToLogin = () => {
        history('/Login');
    };

    // const reviews = [review1, review2];

    const properties = {
        prevArrow: <div style={{ visibility: 'hidden' }}></div>,
        nextArrow: <div style={{ visibility: 'hidden' }}></div>,
        autoplay: true,
        duration: 5000,
        transitionDuration: 2000,
        onChange: () => { }, // Your onChange function
        onStartChange: () => { } // Your onStartChange function
    };



    return (
        <>
            <section className="Front-Page">
                <div className="Front-Page-Content">
                    <div className="Font-Page-Header-Text">
                        <h1 >Your Story. Your Community. Your <span>Voice</span></h1>
                        <h3> Share your voice with the world.</h3>
                        <p>Welcome to GroupA, the ultimate platform for aspiring writers and avid readers. Here, you can effortlessly create and publish your own blogs, sharing your thoughts, stories, and expertise with a global community. Engage with your audience through comments, fostering meaningful conversations and connections. Whether you're a seasoned writer or just starting out, GroupA provides all the tools you need to make your voice heard and build a community around your content. Start your blogging journey today and be a part of a vibrant and supportive network of storytellers. </p>
                        <button onClick={goToLogin}>LOGIN</button>
                    </div>
                    <div className="Front-Page-Image">
                        <img src = {photo} alt=""></img>
                    </div>
                </div>
            </section>


           {/* <section className="Reviews">
            <Slide {...properties} >
                        {reviews.map((review, index) => (
                            <div key={index} className="each-slide-effect">
                                <div style={{ 'background': url(${image}) }}>
                                </div>
                            </div>
                        ))}
            </Slide> */}

            {/* <section className="Review">
                <div className="wrapper">
                    <Slide {...properties} >
                            {reviews.map((review, index) => (
                                <div key={index} className="each-slide-effect">
                                    </div>
                            ))}
                    </Slide>
                <button id="prev">&lt;</button>
                <button id="next">&gt;</button>
                </div>
            </section> */}



            {/* <section className="AboutUs">
            <div class = "image">
               <img src="https://cdn.pixabay.com/photo/2017/08/26/23/37/business-2684758__340.png">
               </img>
            </div>

            <div class = "content">
                <h2>About Us</h2>
                <p>Welcome to GroupA, where creativity meets community. We are passionate about providing a platform where individuals can share their thoughts, experiences, and insights through blogs. Whether you're an avid writer, a curious reader, or someone looking to engage with diverse perspectives, GroupA is here to connect you. 
                Our mission is to foster a vibrant community of bloggers and readers alike, encouraging meaningful discussions and interactions. With user-friendly tools for creating and sharing content, we empower our users to express themselves freely and authentically.</p>

                <ul class = "links">
                    <li><a href = "/Home">Since 2024</a></li>
                    <div class = "vertical-line"></div>
                    <li><a href = "mailto:anthonylazkani.22@gmail.com">Join Us</a></li>
                    <div class = "vertical-line"></div>
                    <li><a href = "/Contact">Contact us</a></li>
                </ul>
                <ul class = "icons">
                    <li>
                        <i class = "fa fa-twitter"></i>
                    </li>
                    <li>
                        <i class = "fa fa-facebook"></i>
                    </li>
                    <li>
                        <i class = "fa fa-github"></i>
                    </li>
                    <li>
                        <i class = "fa fa-pinterest"></i>
                    </li>
                </ul>
            </div>
        </section> */}

            
        </>
    );
}

export default Home;




