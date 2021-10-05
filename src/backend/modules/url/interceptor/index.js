const { CreateUrlInterceptor } = require('./createUrl.interceptor');
const { DeleteUrlsInterceptor } = require('./deleteUrls.interceptor');

module.exports.UrlInterceptor = [
    CreateUrlInterceptor.intercept,
    DeleteUrlsInterceptor.intercept
];
