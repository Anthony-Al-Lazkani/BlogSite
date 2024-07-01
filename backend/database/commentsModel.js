const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author: {
        type : String,
    },

    comment: {
        type : String
    },

    articleId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }

}, { timestamps : true })

module.exports = mongoose.model('Comment', commentSchema)