const express = require('express');

const router = express.Router();
const { urlRouter } = require('./url/url.router');
const { authRouter } = require('./auth/auth.router');
const { userRouter } = require('./user/user.router');

router.use('/url', urlRouter);

router.use('/users', userRouter);

router.use('/auth', authRouter);

module.exports.ApiRouter = router;
