import express, { Express, Request, Response, NextFunction } from 'express';
import articlesRouter from './routes/v1/articles.route';
import {sendJsonSuccess ,sendJsonErrors} from './helpers/responseHandler'
import bodyParser from 'body-parser';
import cors from "cors";
import createError from 'http-errors';
const app: Express = express();


//Middleware Application ở đây
app.use(cors({ origin: '*' })); //Cho phép gọi bất kỳ đâu

//app.use(cors(corsOptions)); //cho phép gọi từ một domain xác định

//Để nhận định dạng json gửi lên từ client
//app.use(express.json()); //Built-in middleware 
app.use(bodyParser.json())
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))


//Gắn thêm một route vào app.ts
//localhost:8080/api/v1/users
app.use('/api/v1/articles', articlesRouter);
///Hết Middleware


//Danh sách các routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Express + TypeScript Server'});
  });
  
  
  /***
   * Từ đây trở xuống là không được chèn cái gì vào thêm bên dưới
   */
  //Handle Errors App
  // catch 404 and forward to error handler
  app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404)); // Forward 404 errors to the error handler
  });
  
  // error handler --> tất cả lỗi khác rơi vào đây
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    //res.status(statusCode).json({ statusCode: statusCode, message: err.message });
    sendJsonErrors(res,err);
  });
  //Xuất app ra cho server.ts
  export default app