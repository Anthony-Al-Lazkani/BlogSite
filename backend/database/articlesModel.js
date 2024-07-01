const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },

    author : {
        type : String,
        required : false
    },

    content : {
        type : String,
        required : true
    },

    genre : {
        type : String,
        required : true
    },

    comments : {
        type: mongoose.Schema.Types.Array,
        ref: 'Comment'

    },

    likes: {
        type: Number,
        default: 0
    },

    dislikes:{
        type: Number,
        default: 0
    },

    liked_by: {
        type: [String], // Array of strings
        default: []     // Default value is an empty array
    },
    
    disliked_by: {
        type: [String], // Array of strings
        default: []     // Default value is an empty array
    },
    
}, { timestamps : true })


module.exports = mongoose.model('Article', articleSchema)