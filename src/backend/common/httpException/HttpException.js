module.exports.HttpException = class HttpException extends Error {
    code;

    status;

    detail;

    constructor(msg, detail, code, status) {
        super(msg);
        this.detail = detail;
        this.code = code;
        this.status = status;
    }
};
