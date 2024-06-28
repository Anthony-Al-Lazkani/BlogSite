const User = require('../database/usersModel');
const mongoose = require('mongoose');

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

        //creating new user
        const user = await User.create({username,email,password})
        res.status(201).json({message: 'Create user successful', user: user})
    }
    catch (error) {
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
        if (password !== existingUser.password){
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Successful sign-in
        res.status(200).json({ message: 'Sign in successful', user: existingUser });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
};

module.exports = {
    createUser,
    signIn
}