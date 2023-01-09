const router = require('express').Router();

const { AuthInterceptor } = require('@modules/auth/interceptor');
const { AuthController } = require('./auth.controller');

router.post('/signin', ...AuthInterceptor, AuthController.signIn);

module.exports.authRouter = router;
