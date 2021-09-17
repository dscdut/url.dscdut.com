const { UNAUTHORIZED } = require('http-status');
const { ERROR_CODE } = require('./error.enum');
const { HttpException } = require('./HttpException');

module.exports.UnAuthorizedException = class UnAuthorizedException extends HttpException {
    constructor(msg = 'Your access token is not valid') {
        super(msg, ERROR_CODE.UNAUTHORIZED, UNAUTHORIZED);
    }
}
