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

    async deleteManyByIds(ids) {
        const batch = db.batch();
        const deletedUrls = await Promise.all(ids.map(async id => {
            const urlDef = this.model.doc(id);
            const doc = await urlDef.get();
            if (doc.exists) {
                batch.delete(urlDef);
                await batch.commit();
                return id;
            }
        }));
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
