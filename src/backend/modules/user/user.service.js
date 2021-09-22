const { UserRepository } = require('./user.repository');
const { DuplicateException } = require('../../common/httpException');
const UserModel = require('../../model/user.model');

class Service {
    constructor() {
        this.repository = UserRepository;
    }

    async createOne(userDto) {
        const isUserExist = await this.repository.findByEmail(userDto.email);
        if (isUserExist) {
            throw new DuplicateException(`User (${userDto.email}) is already existed`);
        } else {
            await this.repository.createOne(new UserModel(userDto.email, userDto.password).toJSon());
        }
    }
}

module.exports.UserService = new Service();
