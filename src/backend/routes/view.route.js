const express = require('express');

const router = express.Router();
const { UrlController } = require('../api/url/url.controller');
const { AuthRequired } = require('../modules/auth/guard/authRequired');

const renderView = view => (req, res) => res.render(view);

router.get('/', renderView('index'));
router.get('/:slug', UrlController.findBySlug);
router.get('/a/admin/myurls', AuthRequired(true), renderView('myurls'));

module.exports.viewRouter = router;
