const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('../../../infrastructure/interceptor/default-validator.interceptor');
const { JoiUtils } = require('../../../utils/joi.util');

module.exports.CreateUrlInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        url: JoiUtils.url().required(),
        slug: Joi.string().regex(/^\S+$/).message('Slug can not contain whitespace').optional()
    })
);
