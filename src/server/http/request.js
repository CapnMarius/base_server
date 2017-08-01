class HttpRequest {
    constructor(req, res, action, data) {
        this.action = action;
        this.data = data;
        this.req = req;
        this.res = res;
        this.response = this.res;
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
}

module.exports = HttpRequest;