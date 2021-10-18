const { UserService } = require('@modules/user/user.service');
const { ValidHttpResponse } = require('@common/response/validHttp.response');
const { InValidHttpResponse } = require('@common/response/invalidHttp.response');
const { HttpException } = require('@common/httpException/HttpException');

class Controller {
    constructor() {
        this.service = UserService;
    }

    findOne = async (req, res) => {
        try {
            const data = await this.service.getOne(req.user);
            return ValidHttpResponse.toOkResponse(data).toResponse(res);
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
}

module.exports.UserController = new Controller();
