const { CreateUrlInterceptor } = require('./createUrl.interceptor');

module.exports.UrlInterceptor = [
    CreateUrlInterceptor.intercept
];
