const { UNAUTHORIZED } = require('http-status');
const { ERROR_CODE } = require('./error.enum');
const { HttpException } = require('./HttpException');

module.exports.UnAuthorizedException = class UnAuthorizedException extends HttpException {
    constructor(msg = 'Invalid access token') {
        super(msg, ERROR_CODE.UNAUTHORIZED, UNAUTHORIZED);
    }
};
