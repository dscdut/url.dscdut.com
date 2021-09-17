module.exports.HttpResponse = class HttpResponse {
    status;

    data;

    success;

    constructor(status, data) {
        this.status = status;
        this.data = data;
    }

    toResponse(res) {
        return res.status(this.status).json(this.data);
    }
}
