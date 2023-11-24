import { Schema, model } from 'mongoose';
import { IArticle } from '../types/models';

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


const Article = model<IArticle>('Article', articleSchema);
export default Article;