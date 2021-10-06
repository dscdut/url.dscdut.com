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

    async deleteById(id) {
        return this.model.doc(id).delete();
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
