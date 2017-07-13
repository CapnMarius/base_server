class HttpRequest {
    constructor(req, res, action, data) {
        this.action = action;
        this.data = data;
        this.req = req;
        this.res = res;
    }

    getAction() {
        return this.action;
    }

    getData() {
        return this.data;
    }

    getResponse() {
        return this.res;
    }

    getRequest() {
        return this.req;
    }

    response(data = null) {
        this.res.send(data);
    }
}

module.exports = HttpRequest;