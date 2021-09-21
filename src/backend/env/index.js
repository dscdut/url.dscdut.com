require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    CORS_ALLOW: process.env.CORS_ALLOW,
    SESSION_SECRET: process.env.SESSION_SECRET
};
