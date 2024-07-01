const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//unique username, unique email, and password
const usersSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique: true
    },

    email : {
        type : String,
        required : true,
        unique: true
    },

    password : {
        type : String,
        required : true
    },

    friends : {
        type: [String],
        default: []
    },

    pending_friends : {
        type: [String],
        default: []
    }

}, { timestamps : true })



module.exports = mongoose.model('User', usersSchema)

