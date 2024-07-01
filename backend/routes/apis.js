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
const {
    signIn,
    createUser,
    contact_us,
    getUser
} = require('../controllers/userController')

const router = express.Router()

// POST user
router.post('/createUser', createUser)

// POST sign in
router.post('/signIn', signIn)

// POST contact us
router.post('/contact_us', contact_us)

// GET user
router.get('/getUser', getUser)

// GET all articles
router.get('/getArticles', getArticles)

// GET all comments
router.get('/getComments', getComments)

// POST an article
router.post('/createArticle', createArticle)

// POST a comment
router.post('/:id/createComment', createComment)

// Like an article
router.post('/:id/likeArticle', likeArticle)

// Dislike an article
router.post('/:id/dislikeArticle', dislikeArticle)

// GET a single article
router.get('/:id/getArticle', getArticle)

// DELETE an article
router.delete('/:id/deleteArticle', deleteArticle)

// DELETE a comment
router.delete('/:id/deleteComment', deleteComment)

// UPDATE an article
router.patch('/:id/updateArticle', updateArticle)


module.exports = router