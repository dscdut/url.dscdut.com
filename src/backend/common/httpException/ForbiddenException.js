const { HttpException } = require('./HttpException');
const { FORBIDDEN } = require('http-status');
const { ERROR_CODE } = require('./error.enum');

module.exports.ForbiddenException = class ForbiddenException extends HttpException {
    constructor(msg = 'You do not have permission to access this resource') {
        super(msg, ERROR_CODE.FORBIDDEN, FORBIDDEN);
    }
}
