const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('../../../infrastructure/interceptor/default-validator.interceptor');

module.exports.UpdateUrlInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        url: Joi.string().min(1).required(),
        slug: Joi.string().min(1).required(),
    })
);
