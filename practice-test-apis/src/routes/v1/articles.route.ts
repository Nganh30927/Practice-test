import express from 'express';
import articlesController from '../../controllers/articles.controller';
import validateSchema from '../../middleware/validateSchema.middleware';
import aticlesValidation from '../../validations/articles.validation'
const router = express.Router();

//Get All item from db
router.get('/', articlesController.getAll);

//get by id
router.get('/:id', validateSchema(aticlesValidation.getItemById) ,articlesController.getItemById);

//create new item

router.post('/', validateSchema(aticlesValidation.createItem), articlesController.createItem);

export default router;