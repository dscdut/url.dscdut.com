const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const SALT_ROUNDS = require('../../../env');

class BcryptServiceImpl {
    saltRounds;

    /**
     * @param {number} saltRounds 
     */
    constructor() {
        this.saltRounds = SALT_ROUNDS;
    }

    /**
     * @param {string} str normal string
     * @param {string} hashed hashed string
     */
    compare(str, hashed) {
        return compareSync(str, hashed);
    }

    /**
     * @param {string} str to be hashed
     */
    hash(str) {
        const salt = genSaltSync(this.str);
        return hashSync(str, salt);
    }
}

module.exports.BcryptService = new BcryptServiceImpl();
