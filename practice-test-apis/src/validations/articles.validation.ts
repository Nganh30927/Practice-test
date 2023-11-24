import Joi from 'joi';
import {objectId, passwordStrong} from './custom.validation'


const getItemById = {
    params: Joi.object().keys({
        id: Joi.custom(objectId).required(), //Muốn id là số, và bắt buộc điền
      }),
}

const createItem = {
    body: Joi.object().keys({
        title: Joi.string().max(225).required(),
        keyword: Joi.string().min(5).required(),
        description: Joi.string().max(225).optional(),
        content: Joi.string().max(500).required(),
        date: Joi.date()
    })
}

export default {
    getItemById,
    createItem
  };