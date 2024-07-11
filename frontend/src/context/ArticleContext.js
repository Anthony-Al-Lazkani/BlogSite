import { createContext, useReducer  } from "react";

export const ArticlesContext = createContext()

export const articlesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ARTICLES':
            return {
                articles:action.payload
            }
        case 'CREATE_ARTICLE': 
            return {
                articles:[action.payload, ...state.articles] 
            }

        case 'DELETE_ARTICLE':
            return {
                articles:state.articles.filter((w) => w._id!==action.payload)
            }
        case 'CREATE_COMMENT':

        // action.payload here is the newComment
        const comment =  action.payload.comment;
        console.log(comment)
        const articleId = action.payload.id;

        const existingArticles = state.articles;
        // console.log(existingArticles)
        const article = existingArticles.find((a)=>a._id === articleId);
        // console.log(article)


        // Update the existingArticles to add the new comment to the article
        const NewCommentArray = article.comments
        // console.log(NewCommentArray)
        NewCommentArray.push(comment)
        article.comments = NewCommentArray
        existingArticles.map((a)=>{
            if( a._id === articleId) {
                return article
            }else {
                return a
            }
        })
        
        return {
            articles: existingArticles 
        }
            default:
                return state
        }
    }
 

export const ArticlesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(articlesReducer, {
        articles:[]
    })
    return(
        <ArticlesContext.Provider value={{...state, dispatch}}>
            { children }
        </ArticlesContext.Provider>
    )
}