const { lookup } = require('geoip-lite');
const ipaddr = require('ipaddr.js');
const { generateId } = require('@utils');
const { DuplicateException, NotFoundException } = require('@common/httpException');
const { DEFAULT_ID_LENGTH } = require('@common/constants/url.constant');
const { UserRepository } = require('@modules/user/user.repository');
const { NOT_FOUND_ROUTE } = require('@common/constants/route.constant');
const { UrlRepository } = require('./url.repository');
const Url = require('./url.model');

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

    async findBySlug(slug, ipv6) {
        const foundUrl = await this.repository.findBySlug(slug);
        if (!foundUrl) return NOT_FOUND_ROUTE;

        await this.repository.updateClick(foundUrl.id);
        const visitor = this.getIpInformation(ipv6);

        this.repository.insertVisitor(foundUrl.id, visitor);
        return foundUrl.url;
    }

    getIpInformation(ip) {
        const ipv4 = ipaddr.process(ip).toString();
        return {
            ip: ipv4,
            geolocation: lookup(ipv4)
        };
    }

    async deleteMany({ ids }, userDetail) {
        const deletedUrls = await this.repository.deleteMany(ids, userDetail.id);
        const errorIds = ids.filter(id => !deletedUrls.includes(id));
        if (errorIds.length > 0) throw new NotFoundException('Ids not found', errorIds);
    }

    async updateOne(urlId, urlDto, userId) {
        const isUrlExisted = await this.repository.findById(urlId);
        if (!isUrlExisted || isUrlExisted.userId !== userId) throw new NotFoundException('Url Not Found');

        if (urlDto.slug !== isUrlExisted.slug) {
            const isSlugExisted = await this.repository.findBySlug(urlDto.slug);
            if (isSlugExisted) throw new DuplicateException(`Slug (${urlDto.slug}) is already existed`);
        }
        await this.repository.updateOne(urlId, urlDto);
    }

    async findAll(userId, query) {
        const { limit, page } = query;
        const offset = limit * (page - 1);
        return this.repository.findAll(userId, offset, limit);
    }
}

module.exports.UrlService = new UrlServiceImp();
