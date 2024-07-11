import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <Box>
            <h1 style={{ color: "#5B9BD5", textAlign: "left", marginTop: "10px" }}>
                GROUP A
            </h1>
            <FooterContainer>
                <Row>
                    <Column>
                        <Heading>Menu</Heading>
                        <FooterLink href="/Home">Home</FooterLink>
                        <FooterLink href="/Blogs">Blogs</FooterLink>
                        <FooterLink href="/Contact">Contact Us</FooterLink>
                        <FooterLink href="/Login">Login</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Services</Heading>
                        <FooterLink href="/Blogs">Write a Blog</FooterLink>
                        <FooterLink href="/Contact">Give a feedback</FooterLink>
                        <FooterLink href="/Blogs">Navigate Blogs</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>
                        <FooterLink href="tel: +961-78-808-441">
                            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "8px" }} />
                            Phone Number
                        </FooterLink>
                        <FooterLink href="mailto:anthonylazkani.22@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />
                            Email Address
                        </FooterLink>
                        <FooterLink href="/Contact">
                            <FontAwesomeIcon icon={faInstagram} style={{ marginRight: "8px" }} />
                            Instagram
                        </FooterLink>
                        <FooterLink href="mailto:anthonylazkani.22@gmail.com">
                            <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: "8px" }} />
                            Linkedin
                        </FooterLink>
                    </Column>
                </Row>
            </FooterContainer>
        </Box>
    );
};
export default Footer;
