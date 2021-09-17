const { HttpException } = require ('./HttpException');
const { BAD_REQUEST } = require('http-status');
const { ERROR_CODE } = require ('./error.enum');

module.exports.BadRequestException = class BadRequestException extends HttpException {
    constructor(msg = 'Bad request') {
        super(msg, ERROR_CODE.BAD_REQUEST, BAD_REQUEST);
    }
}
