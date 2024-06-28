import React from "react";
import './Home.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Photo1 from '../../Images/hi3.jpg';
import Photo2 from '../../Images/hi4.jpeg';
import Photo3 from '../../Images/hi5.jpg';
// import Photo4 from '../../images/pic4.jpg';
// import Photo5 from '../../images/photo5.jpg';


function Home() {
    const history = useNavigate();
    const goToaboutus = () => {
        history('/aboutus');
    };
    const goToLogin = () => {
        history('/login');
    }

    const images = [Photo1, Photo2, Photo3];
    //Photo2, Photo3, Photo4, Photo5


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
                <Slide {...properties} >
                    {images.map((image, index) => (
                        <div key={index} className="each-slide-effect">
                            <div style={{ 'backgroundImage': `url(${image})` }}>
                            </div>
                        </div>
                    ))}
                </Slide>
                <div className="Front-Page-Content">
                    <h1 className="Font-Page-Header-Text">Your Story. Your Community. Your Voice.</h1>
                    <p>Join a vibrant community where your stories come to life. Explore diverse perspectives, engage in meaningful discussions, and share your voice with the world.
                    </p>
                    <div>
                        <button type="button" onClick={goToaboutus}><span></span>LEARN MORE</button>
                        <button type="button" onClick={goToLogin}><span></span>SUBSCRIBE</button>
                    </div>
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

            {/* <section className="Facilities">
                <h1>What you can find?</h1>

                <div className="Row">
                    <div className="Facilities-Col">
                        <div className="Food-Image"></div>
                        <h3>Top Tier Food</h3>
                        <p>Restaurants with the best food that you can find in our beloved country! </p>
                    </div>
                    <div className="Facilities-Col">
                        <div className="Hotel-Image"></div>
                        <h3>Most Luxirious Hotels</h3>
                        <p>
                            Hotels in Lebanon offer a unique blend of Middle Eastern hospitality, combining modern amenities with a rich cultural experience </p>
                    </div>
                    <div className="Facilities-Col">
                        <div className="Beach-Image"></div>
                        <h3>Beaches In Lebanon</h3>
                        <p>Lebanon's beaches beckon with their Mediterranean charm, boasting crystal-clear waters, golden sands, and vibrant seaside culture, creating an idyllic coastal escape.</p>
                    </div>
                </div>
            </section> */}


            <section className="cta">
                <h1>Have questions, suggestions, or feedback? We'd love to hear from you! <br />Feel free to reach out to our team by pressing the button below !</h1>
                <Link to="/ContactUs"><button>CONTACT US</button></Link>
            </section>


        </>

    );
}

export default Home;
