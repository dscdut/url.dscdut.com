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
        const isUserExist = await this.findOne(userDto.email);
        if (isUserExist) {
            throw new DuplicateException(`User (${userDto.email}) is already existed`);
        }
        const hashedPassword = (userDto.password != null)
            ? this.bcryptService.hash(userDto.password)
            : null;
        const newUser = new User(userDto.email, hashedPassword, userDto.fullName);
        await this.repository.createOne(newUser.toJSon());
    }

    async findOne(email) {
        let success = false;
        const isUserExist = await this.repository.findByEmail(email);
        if (isUserExist) {
            success = true;
        }
        return success;
    }
}

module.exports.UserService = new Service();
