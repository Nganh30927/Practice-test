import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import articlesService from '../services/articles.service';



const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await articlesService.getAll();
      sendJsonSuccess(res)(articles); // Gọi hàm mà có truyền giá trị cho data
    } catch (error) {
      next(error);
    }
  };
  
  const getItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await articlesService.getItemById(req.params.id);
      sendJsonSuccess(res)(articles);
    } catch (error) {
      next(error);
    }
  };
  
  const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const newArticle = await articlesService.createItem(payload);
      sendJsonSuccess(res)(newArticle);
    } catch (error) {
      next(error);
    }
  };

  export default {
    getAll,
    getItemById,
    createItem
  };