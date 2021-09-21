const { CONFLICT } = require('http-status');
const { HttpException } = require('./HttpException');
const { ERROR_CODE } = require('./error.enum');

module.exports.DuplicateException = class DuplicateException extends HttpException {
    constructor(msg = 'Duplicate record') {
        super(msg, ERROR_CODE.DUPLICATED, CONFLICT);
    }
};
