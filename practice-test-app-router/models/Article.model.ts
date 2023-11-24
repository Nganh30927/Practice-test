import {Schema, model, models} from 'mongoose'
import { ObjectId, Date } from "mongoose";

export interface IArticle {
    _id?: ObjectId;
    title: string;
    keyword: string;
    description: string;
    content: string;
    date: Date;
  }
  
/* TodoSchema will correspond to a collection in your MongoDB database. */
const articleSchema = new Schema<IArticle>({
    title: {
      type: String,
      require: true,
      maxlength: 225
    },
    keyword:{
      type: String,
      required: true,
      minlength: 5
    },
    description: {
      type: String,
      required: false,
      maxLength: 225
    },
    content: {
      type: String,
      required: true,
      maxlength: 500
    },
    date:{
      type: Date
    }
  }
  );
  

const Article = models.Article || model<IArticle>('Article', articleSchema);

export default Article;