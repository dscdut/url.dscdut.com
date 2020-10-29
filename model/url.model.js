const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    // id: String,            //h3ks8
    _id:String,
    url: String,           //www.facebook.com
    isActive: Boolean,      //true
    // subUrl: String          // //www.google.com/
});

const Url = mongoose.model('Url', urlSchema, 'urls');

module.exports = Url;