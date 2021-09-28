const express = require('express');

const router = express.Router();
const urlRouters = require('./url.router');
const userRouters = require('./user.router');
const authRouters = require('./auth.router');
const { UrlController } = require('../api/url/url.controller');

router.get('/', (req, res) => res.render('index'));

router.get('/signin', (req, res) => res.render('signin'));

router.get('/signup', (req, res) => res.render('signup'));

router.get('/:slug', UrlController.findBySlug);

router.use('/api/url', urlRouters);

router.use('/api/users', userRouters);

router.use('/api/auth', authRouters);

module.exports = router;
