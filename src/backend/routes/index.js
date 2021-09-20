const express = require('express');
const router = express.Router();
const urlRouters = require('./url.router');
const { UrlController } = require('../api/url/url.controller');

router.get('/', (req, res) => {
  return res.render('index');
});

router.get('/signin', (req, res) => {
  return res.render('signin');
})

router.get('/signup', (req, res) => {
  return res.render('signup');
})

router.get('/:slug', UrlController.findBySlug);

router.use('/api/url', urlRouters)

module.exports = router;