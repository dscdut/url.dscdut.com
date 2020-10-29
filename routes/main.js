const express = require('express');
const router = express.Router();
// const urlController = require('../controller/url');
const {getUrl, saveUrl} = require('../controller/url');

router.get('/',(req,res)=>{
  return  res.write('<h1>SHORTEN URL TOOL :></h1>');
});

router.get('/:id', getUrl);  
router.post('/url', saveUrl);

module.exports = router;