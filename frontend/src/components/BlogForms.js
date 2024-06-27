import { useState } from 'react'
import { useBlogsContext } from '../hooks/useBlogsContext'

const BlogForm = () => {
  const { dispatch } = useBlogsContext()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const genre = {title, author, description, genre}
    
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blogs),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setAuthor('')
      setDescription('')
      setGenre('')
      dispatch({type: 'CREATE_BLOG', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Blog</h3>

      <label>Blog Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Author:</label>
      <input 
        type="text" 
        onChange={(e) => setAuthor(e.target.value)} 
        value={author}
        className={emptyFields.includes('author') ? 'error' : ''}
      />

      <label>Description: </label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

    <label>Genre: </label>
      <input 
        type="text" 
        onChange={(e) => setGenre(e.target.value)} 
        value={genre}
        className={emptyFields.includes('genre') ? 'error' : ''}
      />

      <button>Add Blog</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BlogForm