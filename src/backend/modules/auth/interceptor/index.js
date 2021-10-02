const { SignInInterceptor } = require('./signIn.interceptor');

module.exports.AuthInterceptor = [
    SignInInterceptor.intercept
];
