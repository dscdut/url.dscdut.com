const express = require('express');

const router = express.Router();
const { ApiRouter } = require('../api/api.router');
const { viewRouter } = require('./view.route');

const { ValidateAndGetDetail } = require('../modules/auth/guard/jwtValidator');
const { AuthRequired } = require('../modules/auth/guard/authRequired');

router.use('/', viewRouter);

router.use('/a/api', ValidateAndGetDetail, ApiRouter);

router.use('/a/admin', ValidateAndGetDetail, AuthRequired, ApiRouter);

module.exports = router;
