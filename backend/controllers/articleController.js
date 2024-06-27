const Article = require('../database/articlesModel')
const mongoose = require('mongoose')


// GET all articles
const getArticles = async (req, res) => {
    const articles = await Article.find({}).sort({createdAt : -1})

    res.status(200).json(articles)
}


// GET a single article
const getArticle = async (req, res) => {
    const { id } = req.params

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "Sorry ! Article Unavailable"})
    }

    const article = await Article.findById(id)

    if (!article) {
        return res.status(404).json({error : "Sorry ! Article Unavailable"})
    }

    res.status(200).json(article)
}


// CREATE a new article
const createArticle = async (req, res) => {
    const {title, author, description, genre} = req.body

    try{
        const article = await Article.create({title, author, description, genre})
        res.status(200).json(article)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


// DELETE an article
const deleteArticle = async (req, res) => {
    const { id } = req.params

    // Check if ID is valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "Sorry ! Article Unavailable"})
    }

    const article = await Article.findOneAndDelete({_id: id})

    if (!article) {
        return res.status(400).json({error : "Sorry ! Article Unavailable"})
    }

    res.status(200).json(article)
}


// UPDATE an article
const updateArticle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "Sorry ! Article Unavailable"})
    }

    const article = await Article.findByIdAndUpdate({_id : id}, {
        ...req.body

    })

    if (!article) {
        return res.status(400).json({error : "Sorry ! Article Unavailable"})
    }

    res.status(200).json(article)
}





module.exports = {
    createArticle,
    getArticle,
    getArticles,
    deleteArticle,
    updateArticle
}