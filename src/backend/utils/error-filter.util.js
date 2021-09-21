const { BAD_REQUEST } = require('http-status');
const { InValidHttpResponse } = require('../common/response/invalidHttp.response');
const { ERROR_CODE } = require('../common/httpException/error.enum');

module.exports.responseJoiError = (res, error) => new InValidHttpResponse(
    BAD_REQUEST,
    ERROR_CODE.BAD_REQUEST,
    error.details[0] ? error.details[0].message : '',
).toResponse(res);
