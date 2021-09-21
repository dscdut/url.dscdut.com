const { USERS_COLLECTION } = require("../../common/constants/collection.constant");
const { RepositoryBase } = require("../../infrastructure/repository/repositoryBase");

class Repository extends RepositoryBase {
    constructor() {
        super(USERS_COLLECTION)
    }
    
}

module.exports.UserRepository = new Repository;