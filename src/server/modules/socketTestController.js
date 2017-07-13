const Base = require("./base");
const logger = require("../../libs/logger");
const singleton = require("../../libs/singletonFactory");

class SocketTestController extends Base {
    testAction(request) {
        logger.log(request.data);
        setInterval(() => {
            request.response("hoi!");
        }, 2000);
    }
}

module.exports = data => singleton("SocketTestController", SocketTestController, data);