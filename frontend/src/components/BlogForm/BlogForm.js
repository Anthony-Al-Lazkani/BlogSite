import React, { useContext, useState } from "react";
import './BlogForm.css';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaComment, FaRegComment, FaTrash, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { ArticlesContext } from "../../context/ArticleContext";


function BlogForm({ article }) {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(ArticlesContext);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No token found. User not authenticated.');

            const response = await axios.post(
                `http://localhost:4000/api/articles/${article._id}/likeArticle`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }


            );

            setLike(true);
            setDislike(false);
            // Update article likes in parent component or context
        } catch (error) {
            setError('Error liking article. Please try again.');
            console.error('Error liking article:', error);
        }

    };

    const handleDislike = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No token found. User not authenticated.');

            const response = await axios.post(
                `http://localhost:4000/api/articles/${article._id}/dislikeArticle`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setDislike(true);
            setLike(false);
            // Update article dislikes in parent component or context
        } catch (error) {
            setError('Error disliking article. Please try again.');
            console.error('Error disliking article:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No token found. User not authenticated.');

            const response = await axios.delete(
                `http://localhost:4000/api/articles/${article._id}/deleteArticle`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                dispatch({type: 'DELETE_ARTICLE', payload : article._id})
                console.log('article deleted') // Remove article from state or context
            } else {
                setError('Error deleting article. Please try again.');
                console.error('Delete article failed:', response.data);
            }
        } catch (error) {
            setError('Error deleting article. Please try again.');
            console.error('Error deleting article:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No token found. User not authenticated.');

            const response = await axios.post(
                `http://localhost:4000/api/articles/${article._id}/createComment`,
                { comment: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch({type : 'CREATE_COMMENT', payload : {id : article._id , comment : response.data.newComment}})

            setNewComment('');
            // Update article comments in parent component or context
        } catch (error) {
            setError('Error adding comment. Please try again.');
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="Blog">
            <div className="Username">
                <p>{article.author}</p>
                <p>{new Date(article.updatedAt).toLocaleDateString()} at {new Date(article.updatedAt).toLocaleTimeString()}</p>
            </div>

            <div className="Title">
                <p>{article.title}</p>
            </div>

            <div className="Content">
                <p>{article.content}</p>
            </div>

            <div className="Buttons">
                <div className="Icons" onClick={handleLike}>
                    {like ? <AiFillLike /> : <AiOutlineLike />}
                    <span>{article.likes.length}</span>
                </div>
                <div className="Icons" onClick={handleDislike}>
                    {dislike ? <AiFillDislike /> : <AiOutlineDislike />}
                    <span>{article.dislikes.length}</span>
                </div>
                <div className="Icons" onClick={() => setCommentVisible(!commentVisible)}>
                    {commentVisible ? <FaComment /> : <FaRegComment />}
                    <span>{article.comments.length}</span>
                </div>
            </div>

            {commentVisible && (
                <div className="CommentsSection">
                    <div className="Comment-Title">
                        <h3>Comments:</h3>
                    </div>
                    {article.comments.length > 0 ? (
                        article.comments.map(comment => (
                            <div key={comment._id} className="Comment">
                                <h6><strong>{comment.author}</strong> {comment.comment}</h6>
                                <p>{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            )}
                        <form onSubmit={handleCommentSubmit} className="CommentForm">
                                <input
                                        type="text" 
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        required
                                    />
                                        <button type="submit"><FaArrowUp /></button>
                        </form>

            {localStorage.getItem('username') === article.author && (
                <div className="deleteBtn" onClick={handleDelete}>
                    <FaTrash />
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default BlogForm;
