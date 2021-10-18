const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('@infrastructure/interceptor/default-validator.interceptor');
const { JoiUtils } = require('@utils/joi.util');

module.exports.DeleteUrlsInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        ids: JoiUtils.optionalStrings().required(),
    })
);
