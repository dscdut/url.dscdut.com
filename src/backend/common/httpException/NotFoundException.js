const { NOT_FOUND } = require('http-status');
const { ERROR_CODE } = require('./error.enum');
const { HttpException } = require('./HttpException');

module.exports.NotFoundException = class NotFoundException extends HttpException {
    constructor(msg = 'Not found') {
        super(msg, ERROR_CODE.NOT_FOUND, NOT_FOUND);
    }
}
