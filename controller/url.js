const UrlModel = require("../model/url.model");

const saveUrl = async (req, res) => {
  try {
    let { url: rootUrl, slug} = req.body;
    let foundUrl = await UrlModel.findOne({ url: rootUrl });

    if(slug) {
      let isSlugExisted = await UrlModel.findOne({ _id: slug})
      if(isSlugExisted)
        return res.status(409).json({
          error: `Slug (${slug}) is not available`
        })

      await UrlModel.create({ _id: slug, url: rootUrl});
      return res.json({
        success: true,
        slug,
      });
    }

    if (foundUrl) {
      return res.json({
        success: true,
        slug: foundUrl._id,
      });
    }

    let defaultIdLength = 4;
    let newId;
    do {
      newId = generateId(defaultIdLength)
      let isIdExisted = await UrlModel.findOne({ _id: newId });
      if (!isIdExisted) break;
      ++defaultIdLength;
    } while (1);

    await UrlModel.create({ _id: newId, url: rootUrl});
    return res.json({
      success: true,
      slug: newId,
    });
  
  } catch (error) {
    console.log(error);
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

function generateId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

module.exports = {
  getUrl,
  saveUrl,
};
