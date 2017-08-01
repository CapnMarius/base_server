const logger = require("../../libs/logger");
const Request = require("./request");
const path = require("path");

const buildRoute = route => {
    const actionArray = route.split(".");
    const action = actionArray.pop() + "Action";
    const controller = path.join(__serverroot, "modules", actionArray.join("/") + "Controller");
    return {controller, action};
};

const getFunction = (controller, action) => {
    return ((require(controller))())[action];
};

const invoke = async (fn, request) => {
    return await fn(request);
};

class SocketServer {
    constructor(io) {
        io.on("connection", socket => {
            socket.on("route", route => {
                const {controller, action} = buildRoute(route.action);
                if (controller.indexOf("\\Controller") !== -1) {
                    socket.emit("_error", "Controller not found");
                    return;
                } else if (action === "Action") {
                    socket.emit("_error", "Action not found");
                    return;
                }
                try {
                    const fn = getFunction(controller, action);
                    const request = new Request(io, socket, route.action, route.data);
                    invoke(fn, request).catch(err => logger.log(err));
                } catch (err) {
                    console.error(err.message);
                    socket.emit("_error", "Controller '" + route.action + "' not found");
                    return;
                }
            });
        });
    }
}

module.exports = SocketServer;