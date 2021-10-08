module.exports.PaginationDto = query => ({
    limit: parseInt(query.limit, 10) || 10,
    page: parseInt(query.page, 10) || 1
});
