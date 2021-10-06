module.exports = class UrlModel {
    url;

    slug;

    isCustom = false;

    userId;

    visitors;

    toJson() {
        return {
            url: this.url,
            isCustom: this.isCustom,
            slug: this.slug,
            userId: this.userId,
            visitors: this.visitors
        };
    }
};
