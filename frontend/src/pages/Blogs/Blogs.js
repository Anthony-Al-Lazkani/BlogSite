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
import { useArticlesContext } from "../../hooks/useArticlesContext";




function Blogs() {
    const {articles, dispatch} = useArticlesContext()
    const {myArticles, dispatch1} = useArticlesContext()
    // const [articles, setArticles] = useState(null)
    const [form, setForm] = useState(false)
    const [icon, setIcon] = useState(false)
    const [error, setError] = useState('');
    // let token =  0;
    let token =  localStorage.getItem('authToken');


    const toggleForm = () => {
        setForm(!form);
        setIcon(!icon);
    }
  }, []);



    useEffect(() => {
        fetchArticles();
        fetchMyArticles();
      }, []);
    
      const fetchArticles = async () => {
        try {
          const token = localStorage.getItem('authToken'); // Assuming you store your token in localStorage
          console.log(token)
          const response = await axios.get('http://localhost:4000/api/articles/getArticlesSortedByTime', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        //   setArticles(response.data);
        dispatch({type: 'SET_ARTICLES', payload: response.data})
        } catch (err) {
          console.error("Error fetching articles:", err);
          if (err.response && err.response.status === 403) {
            setError('Access denied. You do not have permission to view these articles.');
          } else {
            setError('An error occurred while fetching articles.');
          }
        }
      };
      

      const fetchMyArticles = async () => {
        try {
          const token = localStorage.getItem('authToken'); // Assuming you store your token in localStorage
          console.log(token)
          const response = await axios.get('http://localhost:4000/api/articles/getMyArticlesSortedByTime', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        //   setArticles(response.data);
        dispatch1({type: 'SET_ARTICLES', payload: response.data})
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

  const toggleForm = () => {
    setIcon(!icon);
    setForm(!form);
  };

                    <div className="NewArticleForm">
                        {form ? (
                                  <SubmissionForm />
                                ) : (
                                    <div></div>
                        )}
                        {token ? (
                            <h1>There is a token</h1>
                        ) : (
                            <h1>There isnt a token Sorry</h1>
                        )}

                        {myArticles && myArticles.map((article) => (
                            <BlogForm key={article._id} article={article} />
                        ))}

                    </div>
                </div>
            </div>
    )
}

        <div className="NewArticleForm">
          {form ? <SubmissionForm /> : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Blogs;