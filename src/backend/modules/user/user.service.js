const { UserRepository } = require('./user.repository');
const User = require('../../model/user.model');

class Service {
    constructor() {
        this.repository = UserRepository;
    }

    async createOne(userDto) {
        const newUser = new User(userDto.email, userDto.fullName);
        await this.repository.createOne(newUser.toJSon());
    }

    async findByEmail(email) {
        let success = false;
        const isUserExist = await this.repository.findByEmail(email);
        if (isUserExist) {
            success = true;
        }
        return success;
    }
}

module.exports.UserService = new Service();
