const { URLS_COLLECTION } = require('../../common/constants/collection.constant');
const { RepositoryBase } = require('../../infrastructure/repository/repositoryBase');
const { firstDocument } = require('../../utils/getFirstDocument.util');

class UrlRepositoryImp extends RepositoryBase {
    constructor() {
        super(URLS_COLLECTION);
    }

    async findByUrlandIsCustom(url, isCustom) {
        const response = await this.model
            .where('url', '==', url)
            .where('isCustom', '==', isCustom)
            .limit(1)
            .get();

        return firstDocument(response);
    }

    async findBySlug(slug) {
        const response = await this.model
            .where('slug', '==', slug)
            .limit(1)
            .get();
        return firstDocument(response);
    }
}

module.exports.UrlRepository = new UrlRepositoryImp();
