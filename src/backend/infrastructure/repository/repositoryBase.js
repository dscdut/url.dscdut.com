const db = require('../../database');

class RepositoryBase {
    model;

    collectionName

    /**
     * 
     * @param {string} collectionName 
     */
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.model = db.collection(collectionName);
    }

    async findById(id) {
        const res = await this.model.doc(id).get();
        return {
            ...res.data(),
            id,
        };
    }

    async createOne(payload) {
        return this.model.doc().set(payload);
    }

    async updateById(id, payload) {
        return this.model.doc(id).update(payload);
    }

    async deleteMany(ids) {
        const batch = db.batch();
        const deletedUrls = await Promise.all(ids.map(async id => {
            const urlDef = this.model.doc(id);
            const doc = await urlDef.get();
            if (doc.exists) {
                batch.delete(urlDef);
                return id;
            }
        }));
        await batch.commit();
        return deletedUrls;
    }
    /**
     * Use db.batch() to create a transaction
     */
    // async deleteManyByIds(ids) {
    // }
}

module.exports = {
    RepositoryBase
};
