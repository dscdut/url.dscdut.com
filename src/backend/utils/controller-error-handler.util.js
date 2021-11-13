const { HttpException } = require('@common/httpException/HttpException');
const { InValidHttpResponse } = require('@common/response');
const { logger } = require('@modules/logger/winston');

module.exports.errorHandler = (error, res) => {
    if (error instanceof HttpException) {
        return new InValidHttpResponse(error.status, error.code, error.message)
            .toResponse(res);
    }
    logger.error(error);
    return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
};
