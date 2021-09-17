const { CREATED, NO_CONTENT, OK } = require('http-status');
const { HttpResponse } = require('./http.response');

module.exports.ValidHttpResponse = class ValidHttpResponse {
    static toOkResponse(data) {
        const responseData = {
            data,
            success: true
        }
        return new HttpResponse(OK, responseData);
    }

    static toNoContentResponse() {
        return new HttpResponse(NO_CONTENT);
    }

    static toCreatedResponse(data) {
        const responseData = {
            data,
            success: true
        }
        return new HttpResponse(CREATED, responseData);
    }
}
