const express = require('express')
const {
    createArticle,
    getArticle,
    getArticles,
    deleteArticle,
    updateArticle,
    createComment,
    deleteComment,
    getComments,
    likeArticle,
    dislikeArticle
} = require('../controllers/articleController')


const router = express.Router()

// GET all articles
router.get('/', getArticles)

// GET all comments
router.get('/comments', getComments)

// GET a single article
router.get('/:id', getArticle)

// POST an article
router.post('/', createArticle)

// POST a comment
router.post('/:id/comments', createComment)

//Like an article
router.post('/:id/like', likeArticle);

// Dislike an article
router.post('/:id/dislike', dislikeArticle);

// DELETE an article
router.delete('/:id', deleteArticle)

// DELETE a comment
router.delete('/:id/comments', deleteComment)

// UPDATE an article
router.patch('/:id', updateArticle)






module.exports = router