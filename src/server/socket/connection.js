const logger = require("../libs/logger");
const Request = require("./request");

class SocketConnection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        this.socket.on("route", route => {
            const {controller, action} = this.buildRoute(route.action);
            const fn = this.getFunction(controller, action);
            const request = new Request(this.io, this.socket, route.action, route.data);
            this.invoke(fn, request).catch(err => logger.log(err));
        });
    }

    buildRoute(route) {
        const actionArray = route.split(".");
        const action = actionArray.pop() + "Action";
        const controller = path.join(__dirname, "controllers", actionArray.join("/") + "Controller");
        return {controller, action};
    }

    getFunction(controller, action) {
        return (require(controller))[action];
    }

    async invoke(fn, request) {
        return await fn(request);
    }
}

module.exports = SocketConnection;