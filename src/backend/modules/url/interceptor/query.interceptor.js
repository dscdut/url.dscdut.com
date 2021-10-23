const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('@infrastructure/interceptor/default-validator.interceptor');

module.exports.QueryInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        page: Joi.number().min(1),
        limit: Joi.number(),
        search: Joi.string().allow(null, '')
    })
);
