const { lookup } = require('geoip-lite');
const Url = require('./url.model');
const { generateId } = require('../../utils');
const { UrlRepository } = require('./url.repository');
const { DuplicateException, NotFoundException } = require('../../common/httpException');
const { DEFAULT_ID_LENGTH } = require('../../common/constants/url.constant');
const { UserRepository } = require('../user/user.repository');

class UrlServiceImp {
    constructor() {
        this.repository = UrlRepository;
        this.userRepository = UserRepository;
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

    async findBySlug(slug, ip) {
        const foundUrl = await this.repository.findBySlug(slug);
        if (foundUrl) {
            await this.repository.updateClick(foundUrl.id);
            const visitor = {
                ip,
                geolocation: lookup(ip)
            };

            this.repository.insertVisitor(foundUrl.id, visitor);
            return foundUrl.url;
        }
        return '/not-found';
    }

    async deleteMany({ ids }, userDetail) {
        const deletedUrls = await this.repository.deleteMany(ids, userDetail.id);
        const errorIds = ids.filter(id => !deletedUrls.includes(id));
        if (errorIds.length > 0) throw new NotFoundException('Ids not found', errorIds);
    }

    async updateOne(urlId, urlInfo, userId) {
        const isUrlExisted = await this.repository.findById(urlId);
        if (isUrlExisted.userId !== userId || !isUrlExisted) throw new NotFoundException('Url Not Found');

        if (urlInfo.slug !== isUrlExisted.slug) {
            const isSlugExisted = await this.repository.findBySlug(urlInfo.slug);
            if (isSlugExisted) throw new DuplicateException(`Slug (${urlInfo.slug}) is already existed`);
        }
        await this.repository.updateOne(urlId, urlInfo);
    }

    async findAll(userId, query) {
        const { limit, page } = query;
        const offset = limit * (page - 1);
        return this.repository.findAll(userId, offset, limit);
    }
}

module.exports.UrlService = new UrlServiceImp();
