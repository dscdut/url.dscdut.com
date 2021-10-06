const Url = require('./url.model');
const { generateId } = require('../../utils');
const { UrlRepository } = require('./url.repository');
const { DuplicateException } = require('../../common/httpException');
const { DEFAULT_ID_LENGTH } = require('../../common/constants/url.constant');

class UrlServiceImp {
    constructor() {
        this.repository = UrlRepository;
    }

    async createOne({ url, slug }, userDetail) {
        if (slug) {
            const isSlugExisted = await this.repository.findBySlug(slug);
            if (isSlugExisted) {
                throw new DuplicateException(`Slug (${slug}) is already existed`);
            }

            /**
             * - Future: Validate insert fields like mongoose
             */
            const newUrl = new Url();
            newUrl.slug = slug;
            newUrl.url = url;
            newUrl.isCustom = true;
            newUrl.userId = userDetail?.id;
            await this.repository.createOne(newUrl.toJson());
            return {
                slug,
            };
        }

        const foundUrl = await this.repository.findByUrlandIsCustom(url, false);
        // return if there is a random slug
        if (foundUrl) {
            return {
                slug: foundUrl.slug,
            };
        }

        let idLength = DEFAULT_ID_LENGTH;
        let newSlug;

        const isLoop = true;
        do {
            newSlug = generateId(idLength);
            // eslint-disable-next-line no-await-in-loop
            const isIdExisted = (await this.repository.findBySlug(newSlug));
            if (!isIdExisted) break;
            idLength += 1;
        } while (isLoop);

        const newUrl = new Url();
        newUrl.slug = newSlug;
        newUrl.url = url;
        newUrl.userId = userDetail?.id;
        await this.repository.createOne(newUrl.toJson());

        return {
            slug: newSlug,
        };
    }

    async findBySlug(slug) {
        const foundUrl = await this.repository.findBySlug(slug);
        if (foundUrl) return foundUrl.url;
        return '/not-found';
    }

    async deleteMany(ids) {
        const deletedUrls = await this.repository.deleteMany(ids);
        const errorIds = ids.filter(id => !deletedUrls.includes(id));
        if (errorIds.length > 0) throw new NotFoundException('Not found ids:', errorIds);
    }
}

module.exports.UrlService = new UrlServiceImp();
