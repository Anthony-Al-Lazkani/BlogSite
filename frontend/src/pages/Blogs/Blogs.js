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
import { useArticlesContext } from "../../hooks/useArticlesContext";
import axios from "axios";








function Blogs() {

    // const [articles, setArticles] = useState(null)
    const [form, setForm] = useState(false)
    const [icon, setIcon] = useState(false)
    const { articles, dispatch } = useArticlesContext()
    const isLoggedIn = !!localStorage.getItem('authToken');
    const token = localStorage.getItem('authToken')
    console.log(token)
  



    const toggleForm = () => {
        if (!isLoggedIn){
            alert("You need to Sign In First !")
        }else {
            setForm(!form);
            setIcon(!icon);
        }
    }





    useEffect(()=>{
        const fetchArticle = async () => {
            const response = await axios.get('/api/articles/getArticlesSortedByTime')
            // const json = await response.json()
            dispatch({type: 'SET_ARTICLES', payload:response.data})

            // if (response.ok) {
            //     setArticles(json)
            // }
        }

        fetchArticle()
    }, [])

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
                            {icon  ? (
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