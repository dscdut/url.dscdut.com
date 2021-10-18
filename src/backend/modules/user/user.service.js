const { NotFoundException } = require('@common/httpException');
const { UserRepository } = require('./user.repository');
const User = require('./user.model');

class UserServiceImp {
    constructor() {
        this.repository = UserRepository;
    }

    async createOne(userDto) {
        const newUser = new User(userDto.email, userDto.fullName, userDto.avatar);
        return this.repository.createOne(newUser.toJSon());
    }

    async getOne({ id }) {
        const foundUser = await this.repository.findById(id);
        if (!foundUser) {
            throw new NotFoundException('User not found');
        }

        return foundUser;
    }
}

module.exports.UserService = new UserServiceImp();
