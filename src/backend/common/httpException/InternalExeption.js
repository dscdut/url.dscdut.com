const { INTERNAL_SERVER_ERROR } = require('http-status');
const { ERROR_CODE } = require('./error.enum');
const { HttpException } = require('./HttpException');

module.exports.InternalServerException = class InternalServerException extends HttpException {
    constructor(msg = 'Internal server error') {
        super(msg, ERROR_CODE.INTERNAL, INTERNAL_SERVER_ERROR);
    }
};
