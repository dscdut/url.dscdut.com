require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    CORS_ALLOW: process.env.CORS_ALLOW,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    CLIENT_ID: process.env.CLIENT_ID,
    JWT_SECRET: process.env.JWT_SECRET || 'hehe',
    EXPIRE_DAYS: process.env.EXPIRE_DAYS || '1d',
    SITE_KEY: process.env.SITE_KEY,
    SECRECT_KEY: process.env.SECRECT_KEY
};
