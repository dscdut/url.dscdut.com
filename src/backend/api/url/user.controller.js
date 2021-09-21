const { HttpException } = require("../../common/httpException/HttpException");
const { InValidHttpResponse } = require("../../common/response/invalidHttp.response");
const { ValidHttpResponse } = require("../../common/response/validHttp.response");
const user = require("../../model/user.model");
const { UserService } = require("../../modules/users/user.service");

class Controller {
    createUser = async (req, res) => {
        try {
            const userObj = new user(req.body);
            await UserService.createOne(userObj);
            return ValidHttpResponse.toNoContentResponse().toResponse(res);
        } catch (error) {
            if(error instanceof HttpException) {
                return new InValidHttpResponse(error.status, error.code, error.message)
                    .toResponse(res);
            }
            return InValidHttpResponse.toInternalResponse(error.message).toResponse(res);
        }
    }

}

module.exports.UserController = new Controller;