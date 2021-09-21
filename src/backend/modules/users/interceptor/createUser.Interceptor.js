const Joi = require("joi");
const { InValidHttpResponse } = require("../../../common/response/invalidHttp.response");

module.exports.CreateUserInterceptor = function(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    })
    const result = schema.validate(req.body);
    if(result.error ) {
        return InValidHttpResponse.toInternalResponse(result.error).toResponse(res);
    }
    return next();

}