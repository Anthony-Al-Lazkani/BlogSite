const User = require('../database/usersModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { use } = require('../routes/apis');
const { validationResult, body } = require('express-validator');

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
const createUser =[ 
    // Validation and sanitization
    body('username')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('Username must be at least 3 characters long')
        .custom(value => !/\s/.test(value))
        .withMessage('Username must not contain spaces'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address')
        .custom(value => !/\s/.test(value))
        .withMessage('Email must not contain spaces'),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .custom(value => !/\s/.test(value))
        .withMessage('Password must not contain spaces'),

    async (req, res) => {
            // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
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
];

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

        if (user.username===friend.username){
            return res.status(404).json({ error: "You cannot add yourself" });
        }
        // Check if they are already friends
        let alreadyFriends = false;
        for (const friendObj of user.friends) {
        if (friendObj.username === friend.username) {
            alreadyFriends = true;
            break; 
            }
        }
        if (alreadyFriends) {
            return res.status(400).json({ error: "Already friends" });
        }
        
        // Check if friend request already sent
        let requestSent = false;
        for (const pendingFriend of friend.pending_friends) {
            if (pendingFriend.username === user.username) {
                requestSent = true;
                break;
            }
        }
        if (requestSent) {
            return res.status(400).json({ error: "Friend request already sent" });
        }
        // Add to pending
        friend.pending_friends.push({"username":user.username,"id":userId});
        
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
        let alreadyFriends = false;
        for (const friendObj of user.friends) {
        if (friendObj.username === friend.username) {
            alreadyFriends = true;
            break; 
            }
        }
        if (alreadyFriends) {
            return res.status(400).json({ error: "Already friends" });
        }

        // Find the object in pending_friends array
        let indexToRemove = -1;
        for (let i = 0; i < user.pending_friends.length; i++) {
            if (user.pending_friends[i].username === friend.username) {
                indexToRemove = i;
                break;
            }
        }

        // If found, remove the object
        if (indexToRemove !== -1) {
            user.pending_friends.splice(indexToRemove, 1);
        } else {
            return res.status(400).json({ error: "You have not received a friend request from this user" });
        }
        
        user.friends.push({"username":friend.username,"id":id});
        friend.friends.push({"username":user.username,"id":userId});

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
        let alreadyFriends = false;
        for (const friendObj of user.friends) {
        if (friendObj.username === friend.username) {
            alreadyFriends = true;
            break; 
            }
        }
        if (alreadyFriends) {
            return res.status(400).json({ error: "Already friends" });
        }

        // Find the index of the username in pending_friends array
        let pendingIndex = -1;
        for (let i = 0; i < user.pending_friends.length; i++) {
            if (user.pending_friends[i].username === friend.username) {
                pendingIndex = i;
                break;
            }
        }

        // Check if the username was found
        if (pendingIndex !== -1) {
            // Remove the username from the array
            user.pending_friends.splice(pendingIndex, 1);
            // Save the updates to the database
            await user.save();
            // Send a success response
            return res.status(200).json({ message: "Friend request removed successfully" });
        } else {
            // If the username was not found, return an error response
            return res.status(400).json({ error: "You have not received a friend request from this user" });
        };
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

        // Check if they are friends
        let isFriend1 = false;
        let isFriend2 = false;

        // Loop through user's friends to find friend
        for (let i = 0; i < user.friends.length; i++) {
            if (user.friends[i].username === friend.username) {
                user.friends.splice(i, 1);
                isFriend1 = true;
                break;
            }
        }

        // Loop through friend's friends to find user
        for (let j = 0; j < friend.friends.length; j++) {
            if (friend.friends[j].username === user.username) {
                friend.friends.splice(j, 1);
                isFriend2 = true;
                break;
            }
        }

        // If they are not friends
        if (!isFriend1 || !isFriend2) {
            return res.status(400).json({ error: "You are not friends" });
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