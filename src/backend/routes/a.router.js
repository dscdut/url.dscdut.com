const express = require('express');

const router = express.Router();
const { ApiRouter } = require('./api.router');

router.use('/api', ApiRouter);

// router.use('/admin');

module.exports.ARouter = router;
