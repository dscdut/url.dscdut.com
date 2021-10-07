module.exports = class UrlModel {
    url;

    slug;

    isCustom = false;

    userId;

    visitors;

    createdAt;

    totalClick;

    visitors = []

    constructor() {
        this.createdAt = new Date();
        this.totalClick = 1;
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
        };
    }
};
