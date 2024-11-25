const express = require('express');

const router = express.Router();
const { urlRouter } = require('./url/url.router');
const { authRouter } = require('./auth/auth.router');
const { userRouter } = require('./user/user.router');
const { healthRouter } = require('./health/health.router');

router.use('/health', healthRouter);

router.use('/urls', urlRouter);

router.use('/users', userRouter);

router.use('/auth', authRouter);

module.exports.ApiRouter = router;
