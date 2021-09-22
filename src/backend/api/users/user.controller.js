const { HttpException } = require('../../common/httpException/HttpException');
const { InValidHttpResponse } = require('../../common/response/invalidHttp.response');
const { ValidHttpResponse } = require('../../common/response/validHttp.response');
const { CreateUserDTO } = require('../../modules/user/dto/createUser');
const { UserService } = require('../../modules/user/user.service');

class Controller {
    createOne = async (req, res) => {
        try {
            await UserService.createOne(CreateUserDTO(req.body));
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
