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
}

module.exports.UserService = new Service();
