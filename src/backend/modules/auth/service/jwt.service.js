const { sign, decode } = require('jsonwebtoken');
const { JWT_SECRET, EXPIRE_DAYS } = require('../../../env');

class Jwt {
    secret;

    expiresIn;

    constructor() {
        this.secret = JWT_SECRET;
        this.expiresIn = EXPIRE_DAYS;
    }

    sign(payload) {
        return sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    decode(token) {
        return decode(token);
    }
}

module.exports.JwtService = new Jwt();
