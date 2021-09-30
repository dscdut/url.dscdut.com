const { sign, decode } = require('jsonwebtoken');
const { JWT_SECRET, EXPIRE_DAYS } = require('../../../env');

class Jwt {
    secret = JWT_SECRET;

    expiresIn = EXPIRE_DAYS;

    sign(payload) {
        return sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    decode(token) {
        return decode(token);
    }
}

module.exports.JwtService = new Jwt();
