const Article = require('../database/articlesModel')
const User = require('../database/usersModel')
const Comment = require('../database/commentsModel')
const mongoose = require('mongoose')
const { extractAuthToken, decodeToken } = require('./userController');


// GET all comments
const getComments = async (req, res) => {
  const token = extractAuthToken(req);
  // If no token found, respond with 403
  if (!token) {
      return res.sendStatus(403);
  }
  const allComments = await Comment.find({}).sort({createdAt : -1})

  res.status(200).json(allComments)
}

// GET all articles
const getArticlesSortedByTime = async (req, res) => {
  const token = extractAuthToken(req);
  // If no token found, respond with 403
  if (!token) {
      return res.sendStatus(403);
  }
  const articles = await Article.find({}).sort({createdAt : -1})

  res.status(200).json(articles)
}

//GET my articles
const getMyArticlesSortedByTime = async (req,res) => {
  const token = extractAuthToken(req);

  // If no token found, respond with 403
  if (!token) {
      return res.sendStatus(403);
  }

  // Decode the token to get the user ID
  const userId = decodeToken(token);
  if (!userId) {
      return res.sendStatus(403);
  }

  try{
    const user = await User.findById(userId);
    const username = user.username;

    // Find articles where author matches the username
    const articles = await Article.find({ author: username }).sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// GET a single article
const getArticle = async (req, res) => {
    //article id
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
    const {title, content, genre} = req.body

    const token = extractAuthToken(req);

    // If no token found, respond with 403
    if (!token) {
        return res.sendStatus(403);
    }

    // Decode the token to get the user ID
    const userId = decodeToken(token);
    if (!userId) {
        return res.sendStatus(403);
    }

    const user = await User.findById(userId);

    const author = user.username

    try{
        const article = await Article.create({title, author, content, genre})
        res.status(200).json(article)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// CREATE a new comment
const createComment = async (req, res) => {
  const { comment } = req.body;

  const token = extractAuthToken(req);

  // If no token found, respond with 403
  if (!token) {
      return res.sendStatus(403);
  }

  // Decode the token to get the user ID
  const userId = decodeToken(token);
  if (!userId) {
      return res.sendStatus(403);
  }

  const user = await User.findById(userId);

  const author = user.username

  const articleId = req.params.id; // Assuming you pass articleId in the URL params

  try {
    // Check if the article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Create the comment
    const newComment = await Comment.create({ author, comment, articleId });

    // Update the article's comments array with the new comment
    article.comments.push(newComment);
    await article.save();

    res.status(201).json({ message: 'Comment created successfully', newComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  


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

// Delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid comment ID" });
  }

  try {
    // Find the comment and delete it from the Comment collection
    const deletedComment = await Comment.findByIdAndDelete(id);
    const artID = deletedComment.articleId

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Find the article containing the comment and update the comments array
    const updatedArticle = await Article.findByIdAndUpdate(
      artID,
      { $pull: { comments: { articleId: artID } } },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully", deletedComment , updatedArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

// Like an article
const likeArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    article.likes += 1;
    await article.save();
    res.status(200).json({ message: 'Article liked successfully', article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dislike an article
const dislikeArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    article.dislikes += 1;
    await article.save();
    res.status(200).json({ message: 'Article disliked successfully', article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = {
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
}