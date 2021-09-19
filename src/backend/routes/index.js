const express = require('express');
const router = express.Router();
const urlRouters = require('./url.router');
const { UrlController } = require('../api/url/url.controller');

router.get('/', (req, res) => {
  return res.render('index');
});

router.get('/login', (req, res) => {
  return res.render('login');
})

router.get('/:slug', UrlController.findBySlug);

router.use('/api/url', urlRouters)

module.exports = router;