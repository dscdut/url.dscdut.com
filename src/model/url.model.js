module.exports = class Url {
  constructor(url, isCustom = false) {
    this.url = url;
    this.isCustom = isCustom;
  }

  toJson() {
    return {
      url: this.url,
      isCustom: this.isCustom,
    };
  }
};
