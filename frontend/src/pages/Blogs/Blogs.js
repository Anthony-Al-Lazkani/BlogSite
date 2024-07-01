import React from "react";
import './Blogs.css'
import Card from 'react-bootstrap/Card';


function Blogs() {
    return(
        <>
            <section className="First-Page">
                <h1>Enjoy Our Collection Of Latest Blogs !</h1>

                <div className="Blogs">
                    <Card>
                        <Card.Body className="Blog-TXT">
                        <Card.Title>Blog</Card.Title>
                        <Card.Text>
                           Hello World
                        </Card.Text>
                        <Card.Link>Read More</Card.Link>
                        </Card.Body>
                    </Card>

                </div>
                
            </section>
        </>
    )
}


export default Blogs
