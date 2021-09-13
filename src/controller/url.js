const Url = require('../model/url.model');
const db = require('../db');

const saveUrl = async (req, res) => {
  const {url: rootUrl, slug} = req.body;
  const urlRef = db.collection('urls');

  try {
    if (slug) {
      const isSlugExisted = await urlRef
          .doc(slug)
          .get();

      if (isSlugExisted.data()) {
        return res.status(409).json({
          error: `Slug (${slug}) is already existed`,
        });
      }

      await urlRef.doc(slug.trim()).set((new Url(rootUrl, true)).toJson());
      return res.json({
        slug,
      });
    }

    const foundDocs = await urlRef
        .where('url', '==', rootUrl)
        .where('isCustom', '==', false)
        .limit(1)
        .get();

    let foundUrl;
    foundDocs.forEach((doc) => {
      foundUrl = {
        id: doc.id,
        ...doc.data(),
      };
    });

    // return if there is a random slug
    if (foundUrl) {
      return res.json({
        slug: foundUrl.id,
      });
    }

    let defaultIdLength = 4;
    let newId;
    do {
      newId = generateId(defaultIdLength);
      const isIdExisted = await urlRef.doc(newId).get();
      if (!isIdExisted.data()) break;
      ++defaultIdLength;
    } while (true);

    await urlRef.doc(newId).set((new Url(rootUrl)).toJson());

    return res.json({
      slug: newId,
    });
  } catch (error) {
    console.error(error);
  }
};

const getUrl = async (req, res) => {
  const id = req.params.id;
  const urlRef = db.collection('urls');
  if (id) {
    try {
      const foundUrl = await urlRef.doc(id).get();
      const data = foundUrl.data();
      if (data) return res.redirect(data.url);
      return res.status(404).end();
    } catch (error) {
      console.error(error);
    }
  }
};

function generateId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

module.exports = {
  getUrl,
  saveUrl,
};
