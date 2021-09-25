const { UserRepository } = require('./user.repository');
const { DuplicateException } = require('../../common/httpException');
const UserModel = require('../../model/user.model');
const { BcryptService } = require('../auth/service/bcrypt.service');

class Service {
    constructor() {
        this.repository = UserRepository;
        this.bcrypt = BcryptService;
    }

    async createOne(userDto) {
        const isUserExist = await this.repository.findByEmail(userDto.email);
        userDto.password = this.bcrypt.hash(userDto.password);
        if (isUserExist) {
            throw new DuplicateException(`User (${userDto.email}) is already existed`);
        }
        await this.repository.createOne(new UserModel(userDto.email, userDto.password).toJSon());
    }
}

module.exports.UserService = new Service();
