const { URLS_COLLECTION } = require('../../common/constants/collection.constant')
const { RepositoryBase } = require('../../infrastructure/repository/repositoryBase')
class UrlRepositoryImpl extends RepositoryBase {
    constructor() {
        super(URLS_COLLECTION);
    }

    async findByUrlandIsCustom(url, isCustom) {
        let response = await this.model
            .where('url', '==', url)
            .where('isCustom', '==', isCustom)
            .limit(1)
            .get();

        let foundUrl;
        response.forEach((doc) => {
            foundUrl = {
              id: doc.id,
              ...doc.data(),
            };
          });
        return foundUrl
    }
}

module.exports. UrlRepository = new UrlRepositoryImpl();