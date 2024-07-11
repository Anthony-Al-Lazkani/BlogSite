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
        type: mongoose.Schema.Types.Array,
        ref: 'User'
    },

    pending_friends : {
        type: mongoose.Schema.Types.Array,
        ref: 'User'
    },

    requests_sent: {
        type: mongoose.Schema.Types.Array,
        ref: 'User'
    }

}, { timestamps : true })



module.exports = mongoose.model('User', usersSchema)

