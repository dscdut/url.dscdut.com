require('dotenv').config()
const mongoose = require('mongoose');

module.exports = (async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.error("Connected to database");
    } catch (error) {
        console.error(error);
    }
})()