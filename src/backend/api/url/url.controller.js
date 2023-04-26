const { ValidHttpResponse } = require('@common/response/validHttp.response');
const { DeleteUrlsDto } = require('@modules/url/dto/deleteUrls.dto');
const { UpdateUrlDto } = require('@modules/url/dto/updateUrl.dto');
const { PaginationDto } = require('@modules/url/dto/pagination.dto');
const { UrlService } = require('@modules/url/url.service');
const { errorHandler } = require('@utils/controller-error-handler.util');
const { SECRET_KEY } = require('@env/');
const { URL_RECAPTCHA } = require('@common/constants/url.constant');
const { stringify } = require('@utils/stringify.util');

class Controller {
    constructor() {
        this.service = UrlService;
    }

    createOne = async (req, res) => {
        try {
            const obj = {
                secret: SECRET_KEY,
                response: req.body['recaptcha'],
                remoteip: req.connection.remoteAddress,
            };
            const urlRecaptcha = `${URL_RECAPTCHA}?${stringify(obj)}`;
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
            const record = await this.service.findBySlug(req.params.slug, req.ip);
            const metaData = await this.service.retrieveMetadata(record.url);
            return res.render('waiting', {
                metaData,
                redirectUrl: record.url,
                view: record.totalClick,
                createdAt: new Date(record.createdAt._seconds * 1000).toLocaleDateString('vi-VN'),
            });
        } catch (error) {
            console.log('error', error);
            return res.render('not-found');
        }
    }
}

module.exports.UrlController = new Controller();
