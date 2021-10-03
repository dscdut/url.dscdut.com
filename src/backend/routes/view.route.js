const express = require('express');

const router = express.Router();
const { UrlController } = require('../api/url/url.controller');

router.get('/', (req, res) => res.render('index'));
router.get('/myurls', (req, res) => res.render('myurls'));
router.get('/not-found', (req, res) => res.render('not-found'));

router.get('/:slug', UrlController.findBySlug);

module.exports.viewRouter = router;
