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
        // case 'CREATE_COMMENT':

        // // action.payload here is the newComment
        // const comment =  action.payload;
        // const articleId = comment.articleId;

        // const existingArticles = state.articles;
        // const article = existingArticles.find((a)=>a.articleId === articleId);
        // console.log(article.comments)


        // // Update the existingArticles to add the new comment to the article
        // const NewCommentArray = article.comments
        // NewCommentArray.push(comment)
        // article.comments = NewCommentArray
        // existingArticles.map((a)=>{
        //     if( a.articleId === articleId) {
        //         return article
        //     }else {
        //         return a
        //     }
        // })
        
        // return {
        //     articles: existingArticles 
        // }

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