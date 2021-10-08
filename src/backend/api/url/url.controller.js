const { UrlService } = require('../../modules/url/url.service');
const { ValidHttpResponse } = require('../../common/response/validHttp.response');
const { InValidHttpResponse } = require('../../common/response/invalidHttp.response');
const { HttpException } = require('../../common/httpException/HttpException');
const { DeleteUrlsDto } = require('../../modules/url/dto/deleteUrls.dto');
const { UpdateUrlDto } = require('../../modules/url/dto/updateUrl.dto');

class Controller {
    createOne = async (req, res) => {
        try {
            const data = await UrlService.createOne(req.body, req.user);
            return ValidHttpResponse.toCreatedResponse(data).toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }

    async updateOne(req, res) {
        try {
            await UrlService.updateOne(req.params.id, UpdateUrlDto(req.body).slug, req.user.id);
            return ValidHttpResponse.toNoContentResponse().toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }

    async deleteMany(req, res) {
        try {
            await UrlService.deleteMany(DeleteUrlsDto(req.body), req.user);
            return ValidHttpResponse.toNoContentResponse().toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message, error.detail)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }

    /**
     * getAll or by search keyword
     */

    findAll() {

    }

    findBySlug = async (req, res) => {
        try {
            const redirectUrl = await UrlService.findBySlug(req.params.slug, req.ip);
            return res.redirect(redirectUrl);
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
