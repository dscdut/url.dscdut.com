const { USERS_COLLECTION } = require('../../common/constants/collection.constant');
const { RepositoryBase } = require('../../infrastructure/repository/repositoryBase');

class Repository extends RepositoryBase {
    constructor() {
        super(USERS_COLLECTION);
    }

    async createOne(data) {
        this.model.doc(data.email).set(data);
    }
}

module.exports.UserRepository = new Repository();
