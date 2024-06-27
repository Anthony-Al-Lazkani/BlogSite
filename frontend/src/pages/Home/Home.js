import React from "react";
import './Home.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Photo1 from '../../Images/photo1.jpg';
import Photo2 from '../../Images/photo2.jpeg';
import Photo3 from '../../Images/resorts.jpeg';
import Photo4 from '../../Images/photo4.jpeg';
import Photo5 from '../../Images/photo5.jpg';


function Home() {
    const history = useNavigate();
    const goToaboutus = () => {
        history('/aboutus');
    };
    const goToLogin = () => {
        history('/login');
    }

    const images = [Photo1, Photo2, Photo3, Photo4, Photo5];



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
                    <h1 className="Font-Page-Header-Text">WELCOME TO LEBANON</h1>
                    <p>Enrich your vacation with tours full of delicious food, places, and elegent hotels,
                        <br></br>Press the bell icon to learn more.
                    </p>
                    <div>
                        <button type="button" onClick={goToaboutus}><span></span>LEARN MORE</button>
                        <button type="button" onClick={goToLogin}><span></span>SUBSCRIBE</button>
                    </div>
                </div>
            </section>

            <section className="Services">
                <h1>Services We Offer</h1>
                <p>Explore Lebanon with our website! Discover the latest news, exclusive hotel features, and must-visit tourism spots. Your gateway to a vibrant and unforgettable Lebanese experience starts here. Explore, stay informed, and plan your next adventure with us!</p>

                <div className="Row">
                    <div className="Services-Col">
                        <h3>Restaurants</h3>
                        <p>We provide the best restaurants based on the place, view, quality of the food and the experience of your life
                            in different culture throughout lebanon to make you come to lebanon again.
                        </p>
                    </div>
                    <div className="Services-Col">
                        <h3>Hotels</h3>
                        <p>Discover the epitome of luxury and comfort in Lebanon with our curated selection of hotels, each offering a distinct blend of opulence, hospitality, and cultural richness. Immerse yourself in a world where impeccable service meets breathtaking views, ensuring an unforgettable stay.
                        </p>
                    </div>
                    <div className="Services-Col">
                        <h3>Resorts</h3>
                        <p>"Escape to a world of unparalleled luxury and tranquility with our handpicked selection of resorts in Lebanon. Nestled amidst the breathtaking landscapes and cultural richness of this enchanting country, our resorts redefine the meaning of indulgence.
                        </p>
                    </div>
                </div>
            </section>

            <section className="Facilities">
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
            </section>


            <section className="cta">
                <h1>For more information about LConnect I encourage you to Contact Us <br />by pressing the button below !</h1>
                <Link to="/ContactUs"><button>CONTACT US</button></Link>
            </section>


        </>

    );
}

export default Home;
