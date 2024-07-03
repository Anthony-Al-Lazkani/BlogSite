const User = require('../database/usersModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { use } = require('../routes/apis');

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

const contact_us = async (req,res) => {
    
    const { email } = req.body;

    // Validate that email is provided
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    //sending mail using nodemailer
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Message from contact us',
        text: 'Hi, Thank you for contacting us! How can we assist you.'
    };
    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email', error: error.message });
        }
        res.status(200).json({ message: 'Email sent successfully', info: info.response }); 
    });

};

const getUser = async (req, res) => {
    const token = extractAuthToken(req);

    // If no token found, respond with 403
    if (!token) {
        return res.sendStatus(403);
    }

    // Decode the token to get the user ID
    const userId = decodeToken(token);
    if (!userId) {
        return res.sendStatus(403);
    }

    // Search the database for the user by ID
    const user = await User.findById(userId);

    // If user not found, respond with 404
    if (!user) {
        return res.status(404).json({ message: 'Invalid process' });
    }

    // Respond with the user details
    res.status(200).json({ user });

};



const addFriend = async (req, res) => {
    const { id } = req.params;
  
    const token = extractAuthToken(req);
  
    // If no token found, respond with 403
    if (!token) {
      return res.sendStatus(403);
    }
  
    // Decode the token to get the user ID
    const userId = decodeToken(token);
    if (!userId) {
      return res.sendStatus(403);
    }
  
    try {
      // Find the user and friend
      const user = await User.findById(userId);
      const friend = await User.findById(id);
  
      if (!user || !friend) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if they are already friends
      if (user.friends.includes(friend.username)) {
        return res.status(400).json({ error: "Already friends" });
      }
      
      // Check if friend request already sent
      if (user.pending_friends.includes(friend.username)) {
        return res.status(400).json({ error: "friend request already sent" });
      }

      // Add to pending
      friend.pending_friends.push(user.username);
      
      // Save the updates to the database
      await friend.save();
  
      return res.status(201).json({ message: "Friend request sent successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};



const acceptFriend = async (req, res) => {
    const { id } = req.params;
  
    const token = extractAuthToken(req);
  
    // If no token found, respond with 403
    if (!token) {
      return res.sendStatus(403);
    }
  
    // Decode the token to get the user ID
    const userId = decodeToken(token);
    if (!userId) {
      return res.sendStatus(403);
    }
  
    try {
        // Find the user and friend
        const user = await User.findById(userId);
        const friend = await User.findById(id);

        if (!user || !friend) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if they are already friends
        if (user.friends.includes(friend.username)) {
            return res.status(400).json({ error: "Already friends" });
        }

        // remove from pending
        const pendingIndex = friend.pending_friends.indexOf(user.username);
        if (pendingIndex > -1) {
            friend.pending_friends.splice(pendingIndex, 1);
        }
        else{
            return res.status(400).json({ error: "You have not recieved a friend request from this user" });
        }

        user.friends.push(friend.username);
        friend.friends.push(user.username);

        // Save the updates to the database
        await user.save();
        await friend.save();

        return res.status(201).json({ message: "Friend added successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};


const rejectFriend = async (req, res) => {
    const { id } = req.params;
  
    const token = extractAuthToken(req);
  
    // If no token found, respond with 403
    if (!token) {
      return res.sendStatus(403);
    }
  
    // Decode the token to get the user ID
    const userId = decodeToken(token);
    if (!userId) {
      return res.sendStatus(403);
    }
  
    try {
        // Find the user and friend
        const user = await User.findById(userId);
        const friend = await User.findById(id);

        if (!user || !friend) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if they are already friends
        if (user.friends.includes(friend.username)) {
            return res.status(400).json({ error: "Already friends" });
        }

        // remove from pending
        const pendingIndex = friend.pending_friends.indexOf(user.username);
        if (pendingIndex > -1) {
            friend.pending_friends.splice(pendingIndex, 1);
        }

        // Save the updates to the database
        await user.save();
        await friend.save();

        return res.status(201).json({ message: "Friend request rejected successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}; 


const removeFriend = async (req, res) => {
    const { id } = req.params;
  
    const token = extractAuthToken(req);
  
    // If no token found, respond with 403
    if (!token) {
      return res.sendStatus(403);
    }
  
    // Decode the token to get the user ID
    const userId = decodeToken(token);
    if (!userId) {
      return res.sendStatus(403);
    }
  
    try {
        // Find the user and friend
        const user = await User.findById(userId);
        const friend = await User.findById(id);

        if (!user || !friend) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if they arent friends
        if (!user.friends.includes(friend.username)) {
            return res.status(400).json({ error: "You are not friends" });
        }

        const Index1 = friend.friends.indexOf(user.username);
        if (Index1 > -1) {
            friend.friends.splice(Index1, 1);
        }

        const Index2 = user.friends.indexOf(friend.username);
        if (Index2 > -1) {
            user.friends.splice(Index2, 1);
        }

        // Save the updates to the database
        await user.save();
        await friend.save();

        return res.status(201).json({ message: "Friend removed successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};


  

module.exports = {
    createUser,
    signIn,
    contact_us,
    getUser,
    extractAuthToken, 
    decodeToken,
    addFriend,
    acceptFriend,
    rejectFriend,
    removeFriend
}