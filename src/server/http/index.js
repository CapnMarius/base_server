const express = require("express");
const path = require("path");
const router = express.Router();
const logger = require("../../libs/logger");
const Request = require("./request");

const buildRoute = route => {
    const actionArray = route.split(/\/|\\/);
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

router.get("/", (req, res) => res.sendFile(path.join(__serverroot, "../client/index.html")));
router.use("/public", express.static(path.join(__serverroot, "../client/static")));

router.all(/\/.+/, (req, res) => {
    logger.log("TIME: ", new Date());
    // logger.log("HEADER", req.headers);
    logger.log("PATH", req.path);
    logger.log("METHOD", req.method);
    // logger.log("STATUSCODE", req.statusCode);
    // logger.log("STATUSMESSAGE", req.statusMessage);
    logger.log("PARAMS", req.params);
    logger.log("BODY", req.body);
    logger.log("QUERY", req.query);
    const data = req.body || {};
    if (req.query) {
        //data....
    }
    const {controller, action} = buildRoute(req.path);
    if (controller.indexOf("\\Controller") !== -1) {
        res.statusCode = 404;
        res.send("Controller not found");
        return;
    } else if (action === "Action") {
        res.statusCode = 404;
        res.send("Action not found");
        return;
    }
    try {
        const fn = getFunction(controller, action);
        const request = new Request(req, res, action, data);
        invoke(fn, request).catch(err => logger.log(err));
    } catch(err) {
        console.error(err.message);
        res.statusCode = 404;
        res.send("Controller '" + req.path + "' not found");
        return;
    }
});

module.exports = router;