const { UserRepository } = require('./user.repository');
const { DuplicateException } = require('../../common/httpException');
const User = require('../../model/user.model');
const { BcryptService } = require('../auth/service/bcrypt.service');

class Service {
    constructor() {
        this.repository = UserRepository;
        this.bcryptService = BcryptService;
    }

    async createOne(userDto) {
        const isUserExist = await this.repository.findByEmail(userDto.email);
        if (isUserExist) {
            throw new DuplicateException(`User (${userDto.email}) is already existed`);
        }
        const hashedPassword = this.bcryptService.hash(userDto.password);
        const newUser = new User(userDto.email, hashedPassword);
        await this.repository.createOne(newUser.toJSon());
    }
}

module.exports.UserService = new Service();
