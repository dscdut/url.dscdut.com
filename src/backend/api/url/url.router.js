const express = require('express');

const router = express.Router();

const { UrlController } = require('./url.controller');
const { CreateUrlInterceptor } = require('../../modules/url/interceptor/createUrl.interceptor');
const { DeleteUrlsInterceptor } = require('../../modules/url/interceptor/deleteUrls.interceptor');

router.post('/', CreateUrlInterceptor.intercept, UrlController.createOne);
router.delete('/', DeleteUrlsInterceptor.intercept, UrlController.deleteMany);

module.exports.urlRouter = router;
