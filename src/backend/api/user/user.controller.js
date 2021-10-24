const { UserService } = require('@modules/user/user.service');
const { ValidHttpResponse } = require('@common/response/validHttp.response');
const { errorHandler } = require('@utils/controller-error-handler.util');

class Controller {
    constructor() {
        this.service = UserService;
    }

    findOne = async (req, res) => {
        try {
            const data = await this.service.getOne(req.user);
            return ValidHttpResponse.toOkResponse(data).toResponse(res);
        } catch (error) {
            return errorHandler(error, res);
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
