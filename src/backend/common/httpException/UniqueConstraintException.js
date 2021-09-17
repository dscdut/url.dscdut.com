const { CONFLICT } = require('http-status');
const { ERROR_CODE } = require('./error.enum');
const { HttpException } = require('./HttpException');

module.exports.UniqueConstraintException = class UniqueConstraintException extends HttpException {
    constructor(msg = 'Conflict references id') {
        super(msg, ERROR_CODE.UNIQUE_CONSTAINT, CONFLICT);
    }
}
