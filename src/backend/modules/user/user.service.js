const bcrypt = require('bcrypt');
const { UserRepository } = require('./user.repository');
const { DuplicateException } = require('../../common/httpException');
const UserModel = require('../../model/user.model');

class Service {
    constructor() {
        this.repository = UserRepository;
    }

    async createOne(userDto) {
        const isUserExist = await this.repository.findByEmail(userDto.email);
        const hashStr = bcrypt.genSaltSync(10);
        userDto.password = bcrypt.hashSync(userDto.password, hashStr);
        if (isUserExist) {
            throw new DuplicateException(`User (${userDto.email}) is already existed`);
        }
        await this.repository.createOne(new UserModel(userDto.email, userDto.password).toJSon());
    }
}

module.exports.UserService = new Service();
