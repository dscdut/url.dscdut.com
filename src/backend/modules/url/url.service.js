const { lookup } = require('geoip-lite');
const ipaddr = require('ipaddr.js');
const cheerio = require('cheerio');
const { generateId } = require('@utils/id-Generator.util');
const { DuplicateException, NotFoundException, BadRequestException } = require('@common/httpException');
const { DEFAULT_ID_LENGTH } = require('@common/constants/url.constant');
const { UserRepository } = require('@modules/user/user.repository');
const { NOT_FOUND_ROUTE } = require('@common/constants/route.constant');
const { parseUrl } = require('@utils/url.util');
const axios = require('axios');
const { UrlRepository } = require('./url.repository');
const Url = require('./url.model');

class UrlServiceImp {
    constructor() {
        this.repository = UrlRepository;
        this.userRepository = UserRepository;
    }

    async createOne({ url, slug }, userDetail, urlRecaptcha) {
        const { data } = await axios({
            method: 'post',
            url: urlRecaptcha
        });
        if (data.success === false) throw new BadRequestException('Invalid captcha');
        const keywords = parseUrl(url);

        if (slug) {
            if (this.isInvalidSlug(slug)) {
                throw new DuplicateException('Invalid slug');
            }

            const isSlugExisted = await this.repository.findBySlug(slug);

            if (isSlugExisted) {
                throw new DuplicateException(`Slug (${slug}) is already existed`);
            }

            keywords.push(slug);
            const newUrl = new Url();
            newUrl.slug = slug;
            newUrl.url = url;
            newUrl.keywords = keywords.map(keyword => keyword.toLowerCase());
            newUrl.isCustom = true;
            newUrl.userId = userDetail?.id;

            await this.repository.createOne(newUrl.toJson());
            return slug;
        }

        const foundUrl = await this.repository.findRandom(url);
        // return if there is a random slug
        if (foundUrl && !userDetail && !foundUrl.userId) {
            return foundUrl.slug;
        }

        let idLength = DEFAULT_ID_LENGTH;

        const isLoop = true;
        let newSlug;
        do {
            newSlug = generateId(idLength);
            // eslint-disable-next-line no-await-in-loop
            const isIdExisted = (await this.repository.findBySlug(newSlug));
            if (!isIdExisted) break;
            idLength += 1;
        } while (isLoop);

        keywords.push(newSlug);

        const newUrl = new Url();
        newUrl.slug = newSlug;
        newUrl.url = url;
        newUrl.userId = userDetail?.id;
        newUrl.keywords = keywords.map(keyword => keyword.toLowerCase());
        await this.repository.createOne(newUrl.toJson());
        return newSlug;
    }

    isInvalidSlug(slug) {
        return slug === 'a' || slug.startsWith('a/');
    }

    async findBySlug(slug, ipv6) {
        const foundUrl = await this.repository.findBySlug(slug);
        if (!foundUrl) return NOT_FOUND_ROUTE;

        await this.repository.updateClick(foundUrl.id);
        const visitor = this.getIpInformation(ipv6);

        this.repository.insertVisitor(foundUrl.id, visitor);
        return foundUrl;
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

    async findAll(userId, paginationDTO) {
        return this.repository.findAll(userId, paginationDTO);
    }

    async retrieveMetadata(url) {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const title = $('title').text();
            const metaTags = {};

            $('meta').each((i, meta) => {
                const name = $(meta).attr('name');
                const content = $(meta).attr('content');
                const property = $(meta).attr('property');

                if (name) {
                    metaTags[name] = content;
                }

                if (property) {
                    metaTags[property] = content;
                }
            });
            return {
                title,
                metaTags
            };
        } catch (error) {
            return {
                title: 'GDSC-DUT | Shorten URL tool',
                metaTags: {}
            };
        }
    }
}

module.exports.UrlService = new UrlServiceImp();
