require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL,
};
