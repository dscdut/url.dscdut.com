module.exports = class UrlModel {
    url;

    slug;

    isCustom = false;

    userId = null;

    visitors;

    createdAt;

    totalClick;

    visitors = []

    keywords = []

    constructor() {
        this.createdAt = new Date();
        this.totalClick = 0;
    }

    toJson() {
        return {
            url: this.url,
            isCustom: this.isCustom,
            slug: this.slug,
            userId: this.userId,
            visitors: this.visitors,
            createdAt: this.createdAt,
            totalClick: this.totalClick,
            keywords: this.keywords
        };
    }
};
