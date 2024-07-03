import React, { useState, useEffect } from "react";
import './BlogForm.css';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaComment, FaRegComment } from "react-icons/fa";
import { FaPlus, FaTrash} from "react-icons/fa";
import { useArticlesContext } from "../../hooks/useArticlesContext";
import axios from "axios";




function BlogForm({ article }) {
    const { dispatch } = useArticlesContext()
    const DateFetched = article.updatedAt
    const date = new Date(DateFetched)
    const fullDate = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
    const fullHour = date.getHours() + ":" + date.getMinutes()

    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [comment, setComment] = useState(false);
    const [newComment, setNewComment] = useState('');


    const toggleLike = () => {
        setLike(!like);
    };

    const toggleDislike = () => {
        setDislike(!dislike);
    };

    const toggleComment = () => {
        setComment(!comment);
    };

    const handleLike = () => {
        if (!like) {
          setLike(true);
          setDislike(false);
        } else {
          setLike(false);
        }
    };

    const handleDislike = () => {
        if (!dislike) {
          setDislike(true);
          setLike(false);
        } else {
          setDislike(false);
        }
    };

    const deleteArticle = async () => {
        const response = await axios.delete('/api/articles/' + article._id + '/deleteArticle')
        console.log(response.data)
        // const json = await response.json()
        dispatch({type: 'DELETE_ARTICLE', payload:article._id})
    }


    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage or wherever it's stored
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }
    
            const response = await axios.post(
                `http://localhost:4000/api/articles/${article._id}/createComment`,
                { comment: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            const updatedArticle = response.data; // Assuming the response returns the updated article with comments
            setNewComment(''); // Clear the input field
            // Update the state or handle as needed (e.g., fetch updated data)
            // Example: setArticles(updatedArticle);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please log in to add comments.');
                // Handle unauthorized error (e.g., redirect to login page)
            } else {
                console.error('Error adding comment:', error);
            }
        }
    };

    return (
        <div className="Blog">
            <div className="Username">
                <p>{article.author}</p>
                <p>{fullDate} at {fullHour}</p>
            </div>

            <div className="Title">
                <p>{article.title}</p>
            </div>

            <div className="Content">
                <p>{article.content}</p>
            </div>

            <div className="Buttons">
                <div className="Icons">
                    {like ? (
                        <AiFillLike onClick={handleLike} />
                    ) : (
                        <AiOutlineLike onClick={handleLike} />
                    )}
                    <span>{article.likes}</span> {/* Display number of likes */}
                </div>
                <div className="Icons">
                    {dislike ? (
                        <AiFillDislike onClick={handleDislike} />
                    ) : (
                        <AiOutlineDislike onClick={handleDislike} />
                    )}
                    <span>{article.dislikes}</span> {/* Display number of dislikes */}
                </div>
                <div className="Icons">
                    {comment ? (
                        <FaComment onClick={toggleComment} />
                    ) : (
                        <FaRegComment onClick={toggleComment} />
                    )}
                </div>
            </div>
            {/* <button  className="DeleteBtn" onClick={handleDeleteClick}>DELETE</button> */}


            {comment && (
                <div className="CommentsSection">
                    <h3>Comments:</h3>
                    {article.comments.length > 0 ? (
                        article.comments.map(comment => (
                            <div key={comment._id} className="Comment">
                                <p><strong>{comment.author}:</strong> {comment.comment}</p>
                                <p><em>{new Date(comment.createdAt).toLocaleString()}</em></p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                    {/* Add comment form */}
                    <form onSubmit={handleCommentSubmit}>
                        <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}

            <div className="deleteBtnDiv">
                <div className="deleteBtn" onClick={deleteArticle}>
                    <FaTrash />
                </div>
            </div>
        </div>
    );
}

export default BlogForm;
