const { UnAuthorizedException } = require('@common/httpException/UnAuthorizeException');
const { InValidHttpResponse } = require('@common/response/invalidHttp.response');

module.exports.AuthRequired = (isRedirect = false) => (req, res, next) => {
    if (!req['user']) {
        if (isRedirect) {
            return res.redirect('/');
        }
        const error = new UnAuthorizedException();
        return new InValidHttpResponse(error.status, error.code, error.message)
            .toResponse(res);
    }
    next();
};
