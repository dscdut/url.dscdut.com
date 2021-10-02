const express = require('express');

const router = express.Router();
const { ApiRouter } = require('../api/api.router');
const { viewRouter } = require('./view.route');

router.use('/', viewRouter);

router.use('/a/api', ApiRouter);

module.exports = router;
