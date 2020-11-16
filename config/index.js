const {MONGO_URL} = require('../env/index')
const mongoose = require("mongoose");

module.exports = (async () => {
  try {
    await mongoose.connect(MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.error("Connected to database");
  } catch (error) {
    console.error(error);
  }
})();
