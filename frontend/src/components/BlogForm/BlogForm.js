import React from "react";
import { useState } from "react";
import './BlogForm.css'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike  } from "react-icons/ai";
import { FaComment, FaRegComment } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useArticlesContext } from "../../hooks/useArticlesContext";

function BlogForm({ article }) {
    const { dispatch } = useArticlesContext()
    const DateFetched = article.updatedAt
    const date = new Date(DateFetched)
    const fullDate = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
    const fullHour = date.getHours() + ":" + date.getMinutes()



    const [like,setLike] = useState(false)
    const [dislike,setDislike] = useState(false)
    const [comment,setComment] = useState(false)

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

      const handleDeleteClick = async () => {
        const response = await fetch('/api/articles/'+article._id +'/deleteArticle', {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ARTICLE', payload: json})
        }
      }






    return(
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
                            <AiFillLike  onClick={handleLike} />
                        ) : (
                            <AiOutlineLike onClick={handleLike} />
                    )}
                </div>
                <div className="Icons">
                    {dislike ? (
                                <AiFillDislike  onClick={handleDislike} />
                            ) : (
                                <AiOutlineDislike onClick={handleDislike} />
                    )}
                </div>
                <div className="Icons">
                {comment ? (
                                <FaComment  onClick={toggleComment} />
                            ) : (
                                <FaRegComment onClick={toggleComment} />
                    )}
                </div>
            </div>
            {/* <button  className="DeleteBtn" onClick={handleDeleteClick}>DELETE</button> */}

        </div>
    )
}

export default BlogForm