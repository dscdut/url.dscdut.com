const { USERS_COLLECTION } = require('../../common/constants/collection.constant');
const { RepositoryBase } = require('../../infrastructure/repository/repositoryBase');

class Repository extends RepositoryBase {
    constructor() {
        super(USERS_COLLECTION);
    }

    async findByEmail(email) {
        const response = await this.model
            .where('email', '==', email)
            .limit(1)
            .get();

        let foundUser;
        response.forEach(doc => {
            foundUser = {
                id: doc.id,
                ...doc.data(),
            };
        });
        return foundUser;
    }
}

module.exports.UserRepository = new Repository();
