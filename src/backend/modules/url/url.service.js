const Url = require('./url.model');
const db = require('../../database');
const { generateId } = require('../../utils');
const { UrlRepository } = require('./url.repository');
const { DuplicateException, NotFoundException } = require('../../common/httpException');
const {
    URLS_COLLECTION,
} = require('../../common/constants/collection.constant');

class UrlServiceImp {
    constructor() {
        this.repository = UrlRepository;
    }

    async createOne({ url, slug }) {
        const urlRef = db.collection(URLS_COLLECTION);
        if (slug) {
            /**
       * - Current Database use slug as Id
       * - Future: Add field slug to model and use default id
       */
            const isSlugExisted = await this.repository.findById(slug);
            if (isSlugExisted) {
                throw new DuplicateException(`Slug (${slug}) is already existed`);
            }

            /**
       * - This method create new url document and 
       *   add custom Id, use slug as Id
       * - Future: Add field slug to model and use default id
       */
            await urlRef.doc(slug.trim()).set(new Url(url, true).toJson());
            return {
                slug,
            };
        }

        const foundUrl = await this.repository.findByUrlandIsCustom(url, false);

        // return if there is a random slug
        if (foundUrl) {
            return {
                slug: foundUrl.id,
            };
        }

        const DEFAULT_ID_LENGTH = 4;
        const isLoop = true;
        let idLength = DEFAULT_ID_LENGTH;
        let newId;
        do {
            newId = generateId(idLength);
            /**
             * - This method create new url document
             *   add custom Id, use slug as Id
             * - Future: Add field slug to model and use default id
             */
            // eslint-disable-next-line no-await-in-loop
            const isIdExisted = (await urlRef.doc(newId).get()).data();
            if (!isIdExisted) break;
            idLength += 1;
        } while (isLoop);

        await urlRef.doc(newId).set(new Url(url).toJson());

        return {
            slug: newId,
        };
    }

    async findBySlug(slug) {
        const foundUrl = await this.repository.findById(slug);
        if (foundUrl) return foundUrl.url;
        throw new NotFoundException('Link not found');
    }
}

module.exports.UrlService = new UrlServiceImp();
