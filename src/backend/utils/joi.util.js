const Joi = require('joi');

module.exports.JoiUtils = class JoiUtils {
    static VALIDATE_PWD_PATTERN_V1 = /^[a-zA-Z0-9\d@$!%*?&]{6,30}$/

    static VALIDATE_PWD_PATTERN_V2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    static VALIDATE_URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m;

    static optionalString() {
        return Joi
            .string()
            .optional();
    }

    static requiredString() {
        return Joi
            .string()
            .required();
    }

    static email = () => Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });

    static password(custom = false) {
        return custom
            ? Joi.string().regex(JoiUtils.VALIDATE_PWD_PATTERN_V1)
            : Joi.string().regex(JoiUtils.VALIDATE_PWD_PATTERN_V1)
                .message('Invalid password format. Minimum 6 characters');
    }

    static url(custom = false) {
        return custom
            ? Joi.string().regex(JoiUtils.VALIDATE_URL_PATTERN)
            : Joi.string().regex(JoiUtils.VALIDATE_URL_PATTERN)
                .message('Invalid Url');
    }

    static optionalStrings() {
        return Joi.array().items(JoiUtils.optionalString()).min(1);
    }
};
