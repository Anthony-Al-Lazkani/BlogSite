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

const testimonials = [
  {
    name: "Eva Sawyer",
    job: "CEO, Fashworks",
    image: Photo1,
    testimonial:
      "Neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur",
  },
  {
    name: "Katey Topaz",
    job: "Developer, TechCrew",
    image: Photo2,
    testimonial:
      "Elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla",
  },
  {
    name: "Jae Robin",
    job: "UI Designer, Affinity Agency",
    image: Photo3,
    testimonial:
      "Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis",
  },
  {
    name: "Nicola Blakely",
    job: "CEO, Zeal Wheels",
    image: Photo4,
    testimonial:
      "Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
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
            <p>Welcome to GroupA, the ultimate platform for aspiring writers and avid readers...</p>
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
        <div className="content">
          <h2>About Us</h2>
          <p>Welcome to GroupA, where creativity meets community...</p>
          <ul className="links">
            <li><Link to="/Home">Since 2024</Link></li>
            <div className="vertical-line"></div>
            <li><a href="mailto:anthonylazkani.22@gmail.com">Join Us</a></li>
            <div className="vertical-line"></div>
            <li><Link to="/Contact">Contact us</Link></li>
          </ul>
          <ul className="icons">
            <li><i className="fa fa-twitter"></i></li>
            <li><i className="fa fa-facebook"></i></li>
            <li><i className="fa fa-github"></i></li>
            <li><i className="fa fa-pinterest"></i></li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Home;
