const express = require('express');
const router = express.Router();

const { UrlController } = require('../api/url/url.controller');
const { UrlInterceptor } = require('../modules/url/interceptor')

router.post('/', ...UrlInterceptor, UrlController.createOne);

module.exports = router;