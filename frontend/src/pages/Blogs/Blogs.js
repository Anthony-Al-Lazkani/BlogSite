import React, { useEffect, useState } from "react";
import './Blogs.css';
import Card from 'react-bootstrap/Card';
import BlogForm from "../../components/BlogForm/BlogForm";
import '@coreui/coreui/dist/css/coreui.min.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaPlus, FaMinus } from "react-icons/fa";
import SubmissionForm from "../../components/SubmissionForm/SubmissionForm";
import { useArticlesContext } from "../../hooks/useArticlesContext";
import axios from "axios";

function Blogs() {
    const [form, setForm] = useState(false);
    const [icon, setIcon] = useState(false);
    const { articles, dispatch } = useArticlesContext();
    const isLoggedIn = !!localStorage.getItem('authToken');
    const [search, setSearch] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const [showFriendsBlogs, setShowFriendsBlogs] = useState(false);
    const friendsString = localStorage.getItem('friends');
    const friends = JSON.parse(friendsString) || [];

    const toggleForm = () => {
        if (!isLoggedIn) {
            alert("You need to Sign In First !");
        } else {
            setForm(!form);
            setIcon(!icon);
        }
    }

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await axios.get('/api/articles/getArticlesSortedByTime');
            dispatch({ type: 'SET_ARTICLES', payload: response.data });
        }
        fetchArticle();
    }, [dispatch]);

    // Filter articles based on search input, genre, and friends' blogs
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) || article.content.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = article.genre.toLowerCase().includes(filterGenre.toLowerCase()) || article.genre.toLowerCase().includes(filterGenre.toLowerCase());
        const isFriendsBlog = showFriendsBlogs ? friends.some(friend => friend.username === article.author) : true;
        return matchesSearch && matchesGenre && isFriendsBlog;
    });

    return (
        <div className="Home-Page">
            <div className="First-Part">
                <Sidebar />
            </div>
            <div className="Second-Part">
                <div className="filters">
                    <div className="RowDiv">
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            className="search-bar"
                        />
                        <select 
                            value={filterGenre} 
                            onChange={(e) => setFilterGenre(e.target.value)} 
                            className="genre-filter"
                        >
                            <option value="">All Genres</option>
                            <option value="Action">Action</option>
                            <option value="Romance">Romance</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Travel">Travel</option>
                            <option value="Education">Education</option>
                            {/* Add more genres as needed */}
                        </select>
                    </div>
                    <label className="friends-filter">
                        <input 
                            type="checkbox" 
                            checked={showFriendsBlogs} 
                            onChange={(e) => setShowFriendsBlogs(e.target.checked)} 
                        />
                        Show Friends' Blogs
                    </label>
                </div>
                <div className="articles">
                    {filteredArticles && filteredArticles.map((article) => (
                        <BlogForm key={article._id} article={article} />
                    ))}
                </div>
            </div>
            <div className="Third-Part">
                <div className="PlusIconDiv">
                    <div className="PlusIcon" onClick={toggleForm}>
                        {icon ? (
                            <FaMinus />
                        ) : (
                            <FaPlus />
                        )}
                    </div>
                </div>
                <div className="NewArticleForm">
                    {form ? (
                        <SubmissionForm />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blogs;
