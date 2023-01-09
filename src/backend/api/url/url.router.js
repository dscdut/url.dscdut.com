const express = require('express');

const router = express.Router();

const { CreateUrlInterceptor } = require('@modules/url/interceptor/createUrl.interceptor');
const { DeleteUrlsInterceptor } = require('@modules/url/interceptor/deleteUrls.interceptor');
const { UpdateUrlInterceptor } = require('@modules/url/interceptor/updateUrl.interceptor');
const { AuthRequired } = require('@modules/auth/guard/authRequired');
const { QueryInterceptor } = require('@modules/url/interceptor/query.interceptor');
const { UrlController } = require('./url.controller');

router.post('/', CreateUrlInterceptor.intercept, UrlController.createOne);
router.delete('/', AuthRequired(), DeleteUrlsInterceptor.intercept, UrlController.deleteMany);
router.put('/:id', AuthRequired(), UpdateUrlInterceptor.intercept, UrlController.updateOne);
router.get('/', AuthRequired(), QueryInterceptor.intercept, UrlController.findAll);

module.exports.urlRouter = router;
