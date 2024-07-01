const User = require('../database/usersModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
require('dotenv').config();

//JWT key
const JWT_SECRET = process.env.JWT_SECRET;

//function to create token for a user
function createToken(userId) {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + (4 * 24 * 60 * 60), // 4 days expiration
        iat: Math.floor(Date.now() / 1000),
        sub: userId
    };
    return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
}

//function to extract auth token for a user
function extractAuthToken(authenticatedRequest) {
    const authHeader = authenticatedRequest.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
        return authHeader.split(' ')[1];
    } else {
        return null;
    }
}

//function to decode token for a user
function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.sub;
    } catch (error) {
        return null; // Handle invalid tokens or expired tokens
    }
}

// //middleware to authenticate the token
// function authenticateToken(req, res, next) {
//     //extract token
//     const token = extractAuthToken(req);

//     //if no token found respond with 403 
//     if (!token) {
//         return res.sendStatus(403);
//     }

//     // Try to decode the token
//     try {
//         const userId = decodeToken(token);
//         //if token is valid attach it to req object so we can use the id in the functions
//         req.userId = userId;
//         next(); 
//     } catch (error) {
//         // If token is invalid or expired, respond with 403 (Forbidden)
//         return res.sendStatus(403);
//     }
// }

//CreateUser
const createUser = async (req, res) => {
    try{
        //taking the info passed from the user
        const {username,email,password} = req.body;

        //checking for uniqueness of username and email
        const existingUser = await User.findOne({username: username});
        if (existingUser){
            return res.status(400).json({message: 'Invalid parameter'});
        }
        const existingEmail = await User.findOne({email:email});
        if (existingEmail){
            return res.status(400).json({message: 'Invalid parameter'});
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //creating new user
        const user = await User.create({username,email,password:hashedPassword})
        
        // Generate JWT token
        const token = createToken(user._id);

        //successful sign-up
        res.status(201).json({message: 'Create user successful', token, user: user})
    }
    catch (error) {
        //failed sign-up
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

//SignIn
const signIn = async (req,res) => {
    try{
        //taking info passed from the user
        const {username,password} = req.body;

        //checking if user exists in the database
        const existingUser = await User.findOne({username: username});
        if (!existingUser){
            return res.status(400).json({message: 'Invalid username or password'});
        }

        //check if password matches email
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        //generate JWT token
        const token = createToken(existingUser._id);

        //successful sign-in
        res.status(200).json({ message: 'Sign in successful', token, user: existingUser });
    } 
    catch (error) {
        //failed sign-in
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
};

module.exports = {
    createUser,
    signIn
}