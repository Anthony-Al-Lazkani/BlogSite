import { ArticlesContext } from "../context/ArticleContext";
import { useContext } from "react";

export const useArticlesContext = () => {
    const context = useContext(ArticlesContext)

    if (!context) {
        throw Error('useArticlesContext must be used inside an ArticlesContextProvider')
    }


    return context
}