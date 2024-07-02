import React from "react";
import './Blogs.css'
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import BlogForm from "../../components/BlogForm/BlogForm";
import '@coreui/coreui/dist/css/coreui.min.css'
import { FaHome } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaPlus, FaMinus  } from "react-icons/fa";
import SubmissionForm from "../../components/SubmissionForm/SubmissionForm";
import axios from "axios";




const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [icon, setIcon] = useState(false);
  const [form, setForm] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      fetchArticles(storedToken);
    } else {
      setError('No authentication token found. Please log in.');
    }
  }, []);

  const fetchArticles = async (token) => {
    try {
      const response = await axios.get('http://localhost:4000/api/articles/getArticlesSortedByTime', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArticles(response.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      if (err.response && err.response.status === 403) {
        setError('Access denied. You do not have permission to view these articles.');
      } else {
        setError('An error occurred while fetching articles.');
      }
    }
  };

  const toggleForm = () => {
    setIcon(!icon);
    setForm(!form);
  };

  return (
    <div className="Home-Page">
      <div className="First-Part">
        <Sidebar />
      </div>
      <div className="Second-Part">
        <div className="articles">
          {articles && articles.map((article) => (
            <BlogForm key={article._id} article={article} />
          ))}
        </div>
      </div>
      <div className="Third-Part">
        <div className="PlusIconDiv">
          <div className="PlusIcon" onClick={toggleForm}>
            {icon ? <FaMinus /> : <FaPlus />}
          </div>
        </div>

        <div className="NewArticleForm">
          {form ? <SubmissionForm /> : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Blogs;