module.exports = class UrlModel {
    url;

    slug;

    isCustom = false;

    userId;

    toJson() {
        return {
            url: this.url,
            isCustom: this.isCustom,
            slug: this.slug,
            userId: this.userId
        };
    }
};
