const Base = require("./base");
const logger = require("../../libs/logger");
const singleton = require("../../libs/singletonFactory");

class HttpTestController extends Base {
    testAction(request) {
        logger.log(request.data);
        request.response({test: "some data"});
    }
}

module.exports = data => singleton("HttpTestController", HttpTestController, data);