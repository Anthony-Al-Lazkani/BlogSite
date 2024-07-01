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

    content : {
        type : String,
        required : true
    },

    genre : {
        type : String,
        required : true
    },

    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    
    }]
    
}, { timestamps : true })


module.exports = mongoose.model('Article', articleSchema)

