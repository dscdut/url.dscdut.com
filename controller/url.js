const shortid = require("shortid");
const UrlModel = require("../model/url.model");

const saveUrl = async (req, res) => {
  try {
    let { url: rootUrl } = req.body;
    let foundUrl = await UrlModel.findOne({ url: rootUrl });
    if (foundUrl) {
      return res.json({
        slug: foundUrl._id,
      });
    }
    let newId;
    do {
      newId = shortid().slice(0, 5);
      let isIdExisted = await UrlModel.findOne({ _id: newId });
      if (!isIdExisted) break;
    } while (1);
    try {
      await UrlModel.create({ _id: newId, url: rootUrl, isActive: true });
      return res.json({
        success: true,
        slug: newId,
      });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.log("error: " + error);
  }
};

const getUrl = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      let foundUrl = await UrlModel.findOne({ _id: id });
      if (foundUrl) {
        return res.redirect(foundUrl.url);
      } else {
        return res.status(404).end();
      }
    } catch (error) {
      console.error("ERROR: "+error );
    }
  }
};

module.exports = {
  getUrl,
  saveUrl,
};
