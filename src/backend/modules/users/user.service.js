const { UserRepository } = require('./user.repository');
const { DuplicateException } = require('../../common/httpException');
const User = require('../../model/user.model');

class Service {
    constructor() {
        this.userRepository = UserRepository;
    }

    async createOne(body) {
        const isUserExist = await this.userRepository.findById(body.email);
        if (isUserExist) {
            throw new DuplicateException(`User (${body.email}) is already existed`);
        } else {
            await this.userRepository.createOne(new User(body.email, body.password).toJSon());
        }
    }
}

module.exports.UserService = new Service();
