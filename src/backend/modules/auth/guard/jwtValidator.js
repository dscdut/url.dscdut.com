const { UnAuthorizedException } = require('@common/httpException/UnAuthorizeException');
const { InValidHttpResponse } = require('@common/response/invalidHttp.response');
const { JwtService } = require('../service/jwt.service');

module.exports.ValidateAndGetDetail = (req, res, next) => {
    const { accessToken } = req.cookies;
    let payload;

    if (accessToken) {
        const filteredToken = accessToken.startsWith('Bearer')
            ? accessToken.slice(7)
            : accessToken;

        try {
            payload = JwtService.verify(filteredToken);
            req['user'] = payload;
        } catch (e) {
            const error = new UnAuthorizedException();
            return new InValidHttpResponse(error.status, error.code, error.message)
                .toResponse(res);
        }
    }
    next();
};
