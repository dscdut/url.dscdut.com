const router = require('express').Router();

const { AuthController } = require('./auth.controller');
const { AuthInterceptor } = require('../../modules/auth/interceptor');

router.post('/signin', ...AuthInterceptor, AuthController.signIn);

module.exports.authRouter = router;
