const express = require('express')
const {
    createArticle,
    getArticle,
    getArticles,
    deleteArticle,
    updateArticle,
    createComment
} = require('../controllers/articleController')


const router = express.Router()

// GET all articles
router.get('/', getArticles)

// GET a single article
router.get('/:id', getArticle)

// POST an article
router.post('/', createArticle)

// POST a comment
router.post('/:id/comments', createComment)

// DELETE an article
router.delete('/:id', deleteArticle)

// UPDATE an article
router.patch('/:id', updateArticle)






module.exports = router