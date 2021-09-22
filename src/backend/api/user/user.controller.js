const { HttpException } = require('../../common/httpException/HttpException');
const { InValidHttpResponse } = require('../../common/response/invalidHttp.response');
const { ValidHttpResponse } = require('../../common/response/validHttp.response');
const { CreateUserDto } = require('../../modules/user/dto/createUser.dto');
const { UserService } = require('../../modules/user/user.service');

class Controller {
    constructor() {
        this.service = UserService;
    }

    createOne = async (req, res) => {
        try {
            await this.service.createOne(CreateUserDto(req.body));
            return ValidHttpResponse.toNoContentResponse().toResponse(res);
        } catch (error) {
            if (error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }
}

module.exports.UserController = new Controller();
