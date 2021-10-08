const express = require('express');

const router = express.Router();

const { UrlController } = require('./url.controller');
const { CreateUrlInterceptor } = require('../../modules/url/interceptor/createUrl.interceptor');
const { DeleteUrlsInterceptor } = require('../../modules/url/interceptor/deleteUrls.interceptor');
const { AuthRequired } = require('../../modules/auth/guard/authRequired');
const { CheckQueryInterceptor } = require('../../modules/url/interceptor/checkQuery.interceptor');

router.post('/', CreateUrlInterceptor.intercept, UrlController.createOne);
router.delete('/', AuthRequired(), DeleteUrlsInterceptor.intercept, UrlController.deleteMany);
router.get('/', AuthRequired(), CheckQueryInterceptor.intercept, UrlController.findAll);

module.exports.urlRouter = router;
