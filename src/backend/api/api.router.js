const express = require('express');

const router = express.Router();
const { urlRouter } = require('./url/url.router');
const { authRouter } = require('./auth/auth.router');

router.use('/url', urlRouter);

router.use('/auth', authRouter);

module.exports.ApiRouter = router;
