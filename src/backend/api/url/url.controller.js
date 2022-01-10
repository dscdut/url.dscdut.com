const { ValidHttpResponse } = require('@common/response/validHttp.response');
const { DeleteUrlsDto } = require('@modules/url/dto/deleteUrls.dto');
const { UpdateUrlDto } = require('@modules/url/dto/updateUrl.dto');
const { PaginationDto } = require('@modules/url/dto/pagination.dto');
const { UrlService } = require('@modules/url/url.service');
const { errorHandler } = require('@utils/controller-error-handler.util');
const { SECRECT_KEY } = require('@env/');
const { URL_RECAPTCHA } = require('@common/constants/url.constant');

class Controller {
    constructor() {
        this.service = UrlService;
    }

    createOne = async (req, res) => {
        try {
            const urlRecaptcha = `${URL_RECAPTCHA}?secret=${SECRECT_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
            const data = await this.service.createOne(req.body, req.user, urlRecaptcha);
            return ValidHttpResponse.toCreatedResponse(data).toResponse(res);
        } catch (error) {
            return errorHandler(error, res);
        }
    }

    updateOne = async (req, res) => {
        try {
            await this.service.updateOne(req.params.id, UpdateUrlDto(req.body), req.user.id);
            return ValidHttpResponse.toNoContentResponse().toResponse(res);
        } catch (error) {
            return errorHandler(error, res);
        }
    }

    deleteMany = async (req, res) => {
        try {
            await this.service.deleteMany(DeleteUrlsDto(req.body), req.user);
            return ValidHttpResponse.toNoContentResponse().toResponse(res);
        } catch (error) {
            return errorHandler(error, res);
        }
    }

    findAll = async (req, res) => {
        try {
            const data = await this.service.findAll(req.user.id, PaginationDto(req.query));
            return ValidHttpResponse.toOkResponse(data).toResponse(res);
        } catch (error) {
            return errorHandler(error, res);
        }
    }

    findBySlug = async (req, res) => {
        try {
            const redirectUrl = await this.service.findBySlug(req.params.slug, req.ip);
            return res.redirect(redirectUrl);
        } catch (error) {
            return errorHandler(error, res);
        }
    }
}

module.exports.UrlController = new Controller();
