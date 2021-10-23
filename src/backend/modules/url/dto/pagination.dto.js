const { DEFAULT_LIMIT, DEFAULT_PAGE } = require('../../../config/pagination.config');

module.exports.PaginationDto = query => ({
    limit: parseInt(query.limit, 10) || DEFAULT_LIMIT,
    page: parseInt(query.page, 10) || DEFAULT_PAGE,
    search: query.search || ''
});
