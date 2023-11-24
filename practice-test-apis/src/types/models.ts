import { ObjectId, Date } from "mongoose";

export interface IArticle {
  _id?: ObjectId;
  title: string;
  keyword: string;
  description: string;
  content: string;
  date: Date;
}
