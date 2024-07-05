import React from "react";
import './Home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import photo from '../../Images/hi3.png';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Photo1 from '../../Images/face1.jpeg';
import Photo2 from '../../Images/face2.jpeg';
import Photo3 from '../../Images/face3.jpeg';
import Photo4 from '../../Images/face4.jpeg';
import { FaInstagram} from "react-icons/fa";
import { FaFacebook} from "react-icons/fa";
import { FaTwitter} from "react-icons/fa";
import logo from '../../Images/logo.jpg'
const testimonials = [
  {
    name: "Eva Sawyer",
    job: "CEO, Fashworks",
    image: Photo1,
    testimonial:
    "GroupA is a gem for both writers and readers alike! As a content creator, I've found the platform incredibly user-friendly and inspiring. The community is welcoming and the tools available make it easy to publish high-quality content. I've connected with so many wonderful readers and fellow bloggers here. Highly recommend for anyone looking to share their voice with the world!"
},
  {
    name: "Katey Topaz",
    job: "Developer, TechCrew",
    image: Photo2,
    testimonial:
    "I've been using GroupA for a few months now, and it has completely transformed my blogging experience. The engagement from the community is fantastic, and the features for interacting with readers are top-notch. It's a great place to grow your audience and connect with like-minded individuals. Plus, the support team is always helpful and responsive. A must-try for any serious blogger!"
},
  {
    name: "Jae Robin",
    job: "UI Designer, Affinity Agency",
    image: Photo3,
    testimonial:
    "GroupA has been a game-changer for me. The platform is so intuitive and makes it easy to focus on what I love most: writing. The ability to interact with readers through comments has added a new dimension to my blogging. The community is incredibly supportive, and I've learned so much from other bloggers here. If you're looking for a place to share your stories and grow as a writer, GroupA is the place to be!"
},
  {
    name: "Nicola Blakely",
    job: "CEO, Zeal Wheels",
    image: Photo4,
    testimonial:
    "As a tech blogger, GroupA has provided me with the perfect platform to share my insights and connect with readers who share my passion. The site's design is sleek and user-friendly, making it easy to navigate and engage with content. The analytics tools have been invaluable in understanding my audience and improving my content. I couldn't be happier with my experience on GroupA!"
},
];

function Home() {
  const history = useNavigate();
  const goToLogin = () => {
    history('/Login');
  };

  return (
    <>
      <section className="Front-Page">
        <div className="Front-Page-Content">
          <div className="Font-Page-Header-Text">
            <h1>Your Story. Your Community. Your <span>Voice</span></h1>
            <h3>Share your voice with the world.</h3>
            <p>Welcome to GroupA, the ultimate platform for aspiring writers and avid readers. Here, you can effortlessly create and publish your own blogs, sharing your thoughts, stories, and expertise with a global community. Engage with your audience through comments, fostering meaningful conversations and connections. </p>
            <button onClick={goToLogin}>LOGIN</button>
          </div>
          <div className="Front-Page-Image">
            <img src={photo} alt="front page" />
          </div>
        </div>
      </section>

      <section className="Reviews">
        <div className="wrapper">
            <Slide>
            {testimonials.map((testimonial, index) => (
                <div key={index} className="each-slide-effect">
                <div className="testimonial-slide">
                    <p>{testimonial.testimonial}</p>
                    <img src={testimonial.image} alt={testimonial.name} />
                    <h3>{testimonial.name}</h3>
                    <h6>{testimonial.job}</h6>
                </div>
                </div>
            ))}
            </Slide>
        </div>
      </section>


    <section className="AboutUs">
        <div className="section">
            <div className="container">
                <div className="content-section">
                    <div className="title">
                        <h1>About Us</h1>
                    </div>
                    <div className="content">
                        <h3>Welcome to GroupA, where creativity meets community. We are passionate about providing a platform where individuals can share their thoughts, experiences, and insights through blogs. Whether you're an avid writer, a curious reader, or someone looking to engage with diverse perspectives, GroupA is here to connect you.</h3>
                        <p> Our mission is to foster a vibrant community of bloggers and readers alike, encouraging meaningful discussions and interactions. With user-friendly tools for creating and sharing content, we empower our users to express themselves freely and authentically.
                            Join us on this journey of storytelling and connection. Together, we can build a supportive network where every voice is heard and valued.</p>
                        <div className="button">
                            <a href="/Contact">Read More</a>
                        </div>
                    </div>
                    <div className="social">
                        <div className="icons">
                            <a href="/Contact"><FaInstagram /></a>
                        </div>
                        <div className="icons">
                            <a href="/Contact"><FaFacebook /></a>
                        </div>
                        <div className="icons">
                            <a href="/Contact"><FaTwitter /></a>
                        </div>
                    </div>
                </div>
                <div className="image-section">
                    <img src={logo}></img>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}

export default Home;
