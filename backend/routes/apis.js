const express = require('express')
const {
    createArticle,
    getArticle,
    getArticlesSortedByTime,
    getMyArticlesSortedByTime,
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
    getUser,
    addFriend,
    acceptFriend,
    rejectFriend,
    removeFriend
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

// GET all articles sorted by time
router.get('/getArticlesSortedByTime', getArticlesSortedByTime)

//GET my articles sorted by time
router.get('/getMyArticlesSortedByTime', getMyArticlesSortedByTime)

// GET all comments
router.get('/getComments', getComments)

// POST an article
router.post('/createArticle', createArticle)

// POST a comment
router.post('/:id/createComment', createComment)

//POST accept a friend request
router.post('/:id/acceptFriend', acceptFriend)

//DELETE reject a friend request
router.post('/:id/rejectFriend', rejectFriend)

//DELETE remove a friend
router.post('/:id/removeFriend', removeFriend)

// POST send a friend request
router.post('/:id/addFriend', addFriend)

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