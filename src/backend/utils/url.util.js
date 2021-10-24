module.exports.parseUrl = url => {
    const domain = new URL(url);
    const { hostname, pathname } = domain;

    const hostnameArray = hostname.split('.');
    let pathnameArray = pathname.split('/');
    pathnameArray = pathnameArray.slice(1, -1);
    return [...hostnameArray, ...pathnameArray];
};
