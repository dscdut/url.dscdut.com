const shortid = require("shortid");
const UrlModel = require("../model/url.model");

const saveUrl = async (req, res) => {
  let { url: rootUrl } = req.body;
  let foundUrl = await UrlModel.findOne({ url: rootUrl });
  
  if (foundUrl) {
    return res.json({
      success: true,
      slug: foundUrl._id,
    });
  }
  let id;
  do{
    id = shortid().slice(0, 5);
    let isIdExisted = await UrlModel.findOne({"_id":id});
    if(!isIdExisted)
      break;
  }while(1)
  
  await UrlModel.create({ _id:id, url: rootUrl, isActive: true});
  return res.json({
    success: true,
    slug: id,
  });
};

const getUrl = async (req, res) => {
  let id = req.params.id;
  let foundUrl = await UrlModel.findOne({ _id: id });
  if(foundUrl) 
    return res.redirect(foundUrl.url);        

  // id doesn't exist
  return res.json({
    success: false,
    message: "Wrong id",
  });
};

module.exports = {
  getUrl,
  saveUrl
}