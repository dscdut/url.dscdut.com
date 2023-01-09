const { sign, verify } = require('jsonwebtoken');
const { JWT_SECRET, EXPIRE_DAYS } = require('@env');

class JwtServiceImp {
    secret = JWT_SECRET;

    expiresIn = EXPIRE_DAYS;

    sign(payload) {
        return sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verify(token) {
        return verify(token, this.secret);
    }
}

module.exports.JwtService = new JwtServiceImp();
