const { UrlService } = require('../../modules/url/url.service');
const { ValidHttpResponse } = require('../../common/response/validHttp.response');
const { InValidHttpResponse } = require('../../common/response/invalidHttp.response');
const { HttpException } = require('../../common/httpException/HttpException');

class Controller {
    createOne = async (req, res) => {
        try {
            const data = await UrlService.createOne(req.body);
            return ValidHttpResponse.toCreatedResponse(data).toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }

    updateOne() {

    }

    deleteOne() {

    }

    /**
     * getAll or by search keyword
     */

    findAll() {

    }

    findBySlug = async (req, res) => {
        try {
            const redirectUrl = await UrlService.findBySlug(req.params.slug);
            if (redirectUrl) { return res.redirect(redirectUrl); }
            return res.status(404).end();
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }
}

module.exports.UrlController = new Controller();
