import { useState } from 'react'
import React from 'react'
import './SubmissionForm.css'
import { useArticlesContext } from '../../hooks/useArticlesContext'

const SubmissionForm = () => {
  const { dispatch } = useArticlesContext()
  const token = localStorage.getItem("authToken")

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [genre, setGenre] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const article = {title, author, content, genre}
    
    const response = await fetch('/api/articles/createArticle', {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`

      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setAuthor('')
      setContent('')
      setGenre('')
      console.log('new article added:', json)
      dispatch({type: 'CREATE_WORKOUT', payload:json})
    }

  }

  return (
    <form className="FormShape" onSubmit={handleSubmit}> 

      <div className="Inputs">
        <input 
            type="text" 
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
        />

        <input 
            type="text" 
            placeholder='Genre'
            onChange={(e) => setGenre(e.target.value)} 
            value={genre}
        />

        <textarea className="TextBox" placeholder='Feel free to share your thoughts with 500 words !' maxLength={500}
            onChange={(e) => setContent(e.target.value)} 
            value={content} />
      </div>

    <div className="Btn">
        <button>Share</button>
        {error && <div className="error">{error}</div>}
    </div>
    </form>
  )
}

export default SubmissionForm