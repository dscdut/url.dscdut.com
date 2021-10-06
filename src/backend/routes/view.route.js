const express = require('express');

const router = express.Router();
const { UrlController } = require('../api/url/url.controller');
const { AuthRequired } = require('../modules/auth/guard/authRequired');

const renderView = view => (req, res) => res.render(view);

router.get('/', renderView('index'));
router.get('/a/admin/myurls', AuthRequired(true), renderView('myurls'));
router.get('/not-found', renderView('not-found'));
router.get('/:slug', UrlController.findBySlug);

module.exports.viewRouter = router;
