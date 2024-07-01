const express = require('express')
const {
    createArticle,
    getArticle,
    getArticles,
    deleteArticle,
    updateArticle
} = require('../controllers/articleController')
const {
    signIn,
    createUser,
    contact_us
} = require('../controllers/userController')

const router = express.Router()

// GET all articles
router.get('/', getArticles)

// GET a single article
router.get('/:id', getArticle)

// POST an article
router.post('/', createArticle)

// DELETE an article
router.delete('/:id', deleteArticle)

// UPDATE an article
router.patch('/:id', updateArticle)

//Post User
router.post('/createUser', createUser)

//Post sign in
router.post('/signIn', signIn)

//Post contact_us
router.post('/contact_us',contact_us)


module.exports = router