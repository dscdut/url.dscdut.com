module.exports.HttpException = class HttpException extends Error {
    code;

    status;

    detail;

    constructor(msg, code, status, detail = {}) {
        super(msg);
        this.detail = detail;
        this.code = code;
        this.status = status;
    }
};
