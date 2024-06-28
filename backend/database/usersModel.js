const mongoose = require('mongoose')

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

}, { timestamps : true })


module.exports = mongoose.model('User', usersSchema)

