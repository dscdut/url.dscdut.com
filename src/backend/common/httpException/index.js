const { BadRequestException } = require('./BadRequestException');
const { DuplicateException } = require('./DuplicateException');
const { ForbiddenException } = require('./ForbiddenException');
const { InternalServerException } = require('./InternalExeption');
const { NotFoundException } = require('./NotFoundException');
const { UnAuthorizedException } = require('./UnAuthorizeException');
const { UniqueConstraintException } = require('./UniqueConstraintException');


module.exports = {
    BadRequestException,
    DuplicateException,
    ForbiddenException,
    InternalServerException,
    NotFoundException,
    UnAuthorizedException,
    UniqueConstraintException
}