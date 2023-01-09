const { ValidHttpResponse } = require('@common/response/validHttp.response');
const { AuthService } = require('@modules/auth/service/auth.service');
const { SignInDto } = require('@modules/auth/dto/sign-in.dto');
const { errorHandler } = require('@utils/controller-error-handler.util');

class Controller {
    constructor() {
        this.service = AuthService;
    }

    signIn = async (req, res) => {
        try {
            const data = await this.service.signIn(SignInDto(req.body).tokenId);
            return ValidHttpResponse.toCreatedResponse(data).toResponse(res);
        } catch (error) {
            return errorHandler(error, res);
        }
    }
}

module.exports.AuthController = new Controller();
