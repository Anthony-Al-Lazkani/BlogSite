const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author: {
        type : String,
    },

    comment: {
        type : String
    },

    PostID: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }

}, { timestamps : true })

module.exports = mongoose.model('Comment', commentSchema)