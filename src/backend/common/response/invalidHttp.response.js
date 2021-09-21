const { INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } = require('http-status');
const { HttpResponse } = require('./http.response');
const { ERROR_CODE } = require('../httpException/error.enum');

module.exports.InValidHttpResponse = class InValidHttpResponse extends HttpResponse {
    code;

    message;

    constructor(status, code, message) {
        super(status, {
            message,
            code,
            status,
            success: false
        });
    }

    static toInternalResponse(msg) {
        return new InValidHttpResponse(INTERNAL_SERVER_ERROR, ERROR_CODE.INTERNAL, msg);
    }

    static toNotFoundResponse(msg) {
        return new InValidHttpResponse(NOT_FOUND, ERROR_CODE.NOT_FOUND, msg);
    }

    static toBadRequestResponse(msg, detail) {
        return new InValidHttpResponse(BAD_REQUEST, ERROR_CODE.BAD_REQUEST, msg, detail);
    }
};
