const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author: {
        type : String,
    },

    comment: {
        type : String
    }

}, { timestamps : true })

module.exports = mongoose.model('Comment', commentSchema)