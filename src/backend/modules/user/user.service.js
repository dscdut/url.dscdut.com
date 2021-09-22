const { UserRepository } = require('./user.repository');
const { DuplicateException } = require('../../common/httpException');

class Service {
    constructor() {
        this.userRepository = UserRepository;
    }

    async createOne(body) {
        const isUserExist = await this.userRepository.findByEmail(body.email);
        if (isUserExist) {
            throw new DuplicateException(`User (${body.email}) is already existed`);
        } else {
            await this.userRepository.createOne(body);
        }
    }
}

module.exports.UserService = new Service();
