const admin = require('firebase-admin');
const { URLS_COLLECTION } = require('@common/constants/collection.constant');
const { RepositoryBase } = require('@infrastructure/repository/repositoryBase');
const { firstDocument } = require('@utils/getFirstDocument.util');
const db = require('@database');

class UrlRepositoryImp extends RepositoryBase {
    constructor() {
        super(URLS_COLLECTION);
    }

    async findRandom(url) {
        const response = await this.model
            .where('url', '==', url)
            .where('isCustom', '==', false)
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

    async deleteMany(ids, userId) {
        const batch = db.batch();
        const deletedUrls = await Promise.all(ids.map(async id => {
            const urlDef = this.model.doc(id);
            const doc = await urlDef.get();
            if (doc.exists && doc.data().userId === userId) {
                batch.delete(urlDef);
                return id;
            }
        }));
        await batch.commit();
        return deletedUrls;
    }

    async updateOne(id, urlInfo) {
        return this.model.doc(id).update({
            slug: urlInfo.slug,
            url: urlInfo.url
        });
    }

    async insertVisitor(id, visitor) {
        return this.model.doc(id).update({
            visitors: admin.firestore.FieldValue.arrayUnion(visitor)
        });
    }

    async findAll(userId, paginationDTO) {
        const { limit, page, search } = paginationDTO;
        const offset = limit * (page - 1);

        let query = this.model
            .where('userId', '==', userId);

        if (search) {
            query = query.where('keywords', 'array-contains', search.toLowerCase());
        }

        query = query.orderBy('createdAt', 'desc')
            .offset(offset)
            .limit(limit);

        const response = await query.get();

        const listUrls = [];
        response.forEach(doc => {
            listUrls.push({
                id: doc.id,
                slug: doc.data().slug,
                url: doc.data().url,
                totalClick: doc.data().totalClick,
            });
        });
        return listUrls;
    }

    async updateClick(id) {
        return this.model.doc(id).update({
            totalClick: admin.firestore.FieldValue.increment(1),
        });
    }
}

module.exports.UrlRepository = new UrlRepositoryImp();
