"use server"

import connectDB from "@/db/dbConnect";
import Article from "@/models/Article.model";


type ArticleRepository = {
  _id: string;
  title: string;
    keyword: string;
    description: string;
    content: string;
    date: Date;
  
}

//Chạy hàm này trước để kết nối server mongoDB 
connectDB();

export async function getArticle() {
    try {
        //Lất all 
        const articles: ArticleRepository[] = await Article.find();

        console.log(articles);
      
      return { ok: true,articles };
    } catch (error) {
      return { ok: false,error };
    }
  }



 


  

  