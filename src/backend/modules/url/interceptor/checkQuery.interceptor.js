const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('../../../infrastructure/interceptor/default-validator.interceptor');

module.exports.CheckQueryInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        page: Joi.number().min(1).required(),
        limit: Joi.number().required(),
    })
);
