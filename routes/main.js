const express = require('express');
const router = express.Router();
const {getUrl, saveUrl} = require('../controller/url');

router.get('/',(req,res)=>{
  return res.render('index');
});
router.post('/url', saveUrl);

router.get('/:id', getUrl);  

module.exports = router;