const admin = require('firebase-admin');
const { URLS_COLLECTION } = require('../../common/constants/collection.constant');
const { RepositoryBase } = require('../../infrastructure/repository/repositoryBase');
const { firstDocument } = require('../../utils/getFirstDocument.util');
const db = require('../../database');

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

    async insertVisitor(id, visitor) {
        return this.model.doc(id).update({
            visitors: admin.firestore.FieldValue.arrayUnion(visitor)
        });
    }

    async findAll(userId, offset = 0, limit = 10) {
        const response = await this.model
            .orderBy('createdAt', 'desc')
            .offset(offset)
            .limit(limit)
            .get()
            .then(doc => (doc.docs.filter(ok => ok.data().userId === userId)));
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

    async updateClick({ id }) {
        return this.model.doc(id).update({
            totalClick: admin.firestore.FieldValue.increment(1),
        });
    }
}

module.exports.UrlRepository = new UrlRepositoryImp();
