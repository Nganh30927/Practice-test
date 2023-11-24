import Article from "../models/articles.model";
import { IArticle } from "../types/models";



const getAll = async () =>{
    const articles = Article.find();
    return articles;
}

const getItemById = async (id: string) => {
    console.log(id);
    const articles = await Article.findById(id);
    return articles;
}

const createItem = async (payload: IArticle) => {
    const articles = await Article.create(payload);
    return articles;
}

export default {
    getAll,
    getItemById,
    createItem
  };