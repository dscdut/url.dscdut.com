const express = require('express');

const router = express.Router();
const { AuthRequired } = require('@modules/auth/guard/authRequired');
const { ValidateAndGetDetail } = require('@modules/auth/guard/jwtValidator');
const { UrlController } = require('@api/url/url.controller');

const renderView = view => (req, res) => res.render(view);

router.get('/', renderView('index'));
router.get('/a/admin/myurls', ValidateAndGetDetail, AuthRequired(true), renderView('myurls'));
router.get('/not-found', renderView('not-found'));

router.get('/:slug', UrlController.findBySlug);

module.exports.viewRouter = router;
