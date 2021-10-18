const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('@infrastructure/interceptor/default-validator.interceptor');

module.exports.CheckQueryInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        page: Joi.number().min(1),
        limit: Joi.number(),
    })
);
