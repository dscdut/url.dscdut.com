const { SLUG_GENERATOR_PATTERN } = require('../common/constants/url.constant');

module.exports = length => {
    let result = '';
    const charactersLength = SLUG_GENERATOR_PATTERN.length;
    for (let i = 0; i < length; i += 1) {
        result += SLUG_GENERATOR_PATTERN.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
