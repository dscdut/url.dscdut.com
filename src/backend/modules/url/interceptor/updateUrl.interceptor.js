const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('../../../infrastructure/interceptor/default-validator.interceptor');
const { JoiUtils } = require('../../../utils/joi.util');

module.exports.UpdateUrlInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        slug: JoiUtils.requiredString().min(1),
    })
);
