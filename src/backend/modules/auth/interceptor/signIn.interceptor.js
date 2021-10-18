const Joi = require('joi');
const { DefaultValidatorInterceptor } = require('@infrastructure/interceptor/default-validator.interceptor');
const { JoiUtils } = require('@utils/joi.util');

module.exports.SignInInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        tokenId: JoiUtils.requiredString(),
    })
);
