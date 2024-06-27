const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },

    author : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    genre : {
        type : String,
        required : true
    }
    
}, { timestamps : true })


module.exports = mongoose.model('Article', articleSchema)

