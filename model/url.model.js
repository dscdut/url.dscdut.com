const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  _id: String, 
  url: String, 
});

const Url = mongoose.model("Url", urlSchema, "urls");

module.exports = Url;
