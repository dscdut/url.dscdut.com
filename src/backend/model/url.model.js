module.exports = class UrlModel {
  url;

  slug;
  
  isCustom;

  constructor(url, slug, isCustom = false) {
    this.url = url;
    this.slug = slug;
    this.isCustom = isCustom;

  }

  toJson() {
    return {
      url: this.url,
      isCustom: this.isCustom,
      slug: this.slug
    };
  }
};
