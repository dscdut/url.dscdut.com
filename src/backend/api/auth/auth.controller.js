const { HttpException } = require('../../common/httpException/HttpException');
const { InValidHttpResponse } = require('../../common/response/invalidHttp.response');
const { ValidHttpResponse } = require('../../common/response/validHttp.response');
const { CreateAuthDto } = require('../../modules/auth/dto/createAuth.dto');
const { AuthService } = require('../../modules/auth/service/auth.service');

class Controller {
    constructor() {
        this.service = AuthService;
    }

    signin = async (req, res) => {
        try {
            const data = await this.service.signin(CreateAuthDto(req.body).tokenId);
            return ValidHttpResponse.toCreatedResponse(data).toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }
}

module.exports.AuthController = new Controller();
