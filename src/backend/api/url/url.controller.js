const { ValidHttpResponse } = require('@common/response/validHttp.response');
const { InValidHttpResponse } = require('@common/response/invalidHttp.response');
const { HttpException } = require('@common/httpException/HttpException');
const { DeleteUrlsDto } = require('@modules/url/dto/deleteUrls.dto');
const { UpdateUrlDto } = require('@modules/url/dto/updateUrl.dto');
const { PaginationDto } = require('@modules/url/dto/pagination.dto');
const { UrlService } = require('@modules/url/url.service');

class Controller {
    constructor() {
        this.service = UrlService;
    }

    createOne = async (req, res) => {
        try {
            const data = await this.service.createOne(req.body, req.user);
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
            await this.service.updateOne(req.params.id, UpdateUrlDto(req.body), req.user.id);
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
            await this.service.deleteMany(DeleteUrlsDto(req.body), req.user);
            return ValidHttpResponse.toNoContentResponse().toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message, error.detail)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }

    findAll = async (req, res) => {
        try {
            const data = await this.service.findAll(req.user.id, PaginationDto(req.query));
            return ValidHttpResponse.toOkResponse(data).toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }

    findBySlug = async (req, res) => {
        try {
            const redirectUrl = await this.service.findBySlug(req.params.slug, req.ip);
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
