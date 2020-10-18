const Joi = require('joi');

export const createPersonSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email(),
    phone_number: Joi.number().integer().positive(),
    in_app_notification: Joi.boolean().required()
})