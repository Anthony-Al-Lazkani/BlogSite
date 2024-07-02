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





function Blogs() {

    const [articles, setArticles] = useState(null)
    const [form, setForm] = useState(false)
    const [icon, setIcon] = useState(false)
    const [error, setError] = useState('');
    let token =  localStorage.getItem('authToken');
    console.log(token)


    const toggleForm = () => {
        setForm(!form);
        setIcon(!icon);
    }



    useEffect(() => {
        fetchArticles();
      }, []);
    
      const fetchArticles = async () => {
        try {
             // Assuming you store your token in localStorage
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

    return(
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


export default Blogs
