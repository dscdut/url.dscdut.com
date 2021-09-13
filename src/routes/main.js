const express = require('express');
const router = express.Router();
const {getUrl, saveUrl} = require('../controller/url');
const filterBody = require('../middleware/filterUrl');

router.get('/', (req, res) => {
  return res.render('index');
});

router.get('/:id', getUrl);
router.post('/api/url', filterBody, saveUrl);

module.exports = router;
