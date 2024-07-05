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
    const token = localStorage.getItem('authToken');
    const [search, setSearch] = useState(""); // State for search input

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

    // Filter articles based on search input
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(search.toLowerCase()) || 
        article.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="Home-Page">
            <div className="First-Part">
                <Sidebar />
            </div>
            <div className="Second-Part">
                <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="search-bar"
                />
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
