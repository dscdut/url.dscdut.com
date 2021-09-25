const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const SALT_ROUNDS = require('../../../env');

class BcryptServiceImp {
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
     * @param {*} str to be hashed
     */
    hash(str) {
        const salt = genSaltSync(this.str);
        return hashSync(str, salt);
    }
}

module.exports.BcryptService = new BcryptServiceImp();
