const router = require('express').Router();

const { AuthController } = require('../api/auth/auth.controller');
const { AuthInterceptor } = require('../modules/auth/interceptor/index');

router.post('/signin', ...AuthInterceptor, AuthController.signin);

module.exports = router;
