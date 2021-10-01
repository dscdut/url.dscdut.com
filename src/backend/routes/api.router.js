const express = require('express');

const router = express.Router();
const urlRouters = require('./url.router');
const authRouters = require('./auth.router');

router.use('/url', urlRouters);

router.use('/auth', authRouters);

module.exports.ApiRouter = router;
