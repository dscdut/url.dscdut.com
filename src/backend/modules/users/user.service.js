const { UserRepository } = require("./user.repository");
const User = require('../../model/user.model');
const db = require('../../database');
const { DuplicateException } = require("../../common/httpException");
const { USERS_COLLECTION } = require("../../common/constants/collection.constant");

class Service {
    constructor() {
        this.UserRepository = UserRepository;
    }
    async createOne (body) {
        const userRef = db.collection(USERS_COLLECTION);

        const userIsExist = await this.UserRepository.findById(body.username);
        if(userIsExist) {
            throw new DuplicateException( `User (${body.username}) is already existed`);
        }
        else {
            await userRef.doc(body.username).set(body.toJSon());
        }
        return;
    }
}

module.exports.UserService = new Service();
