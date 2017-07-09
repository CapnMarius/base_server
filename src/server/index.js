const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const httpServer = require("./http/index");
const SocketServer = require("./socket/index");
const config = require("./config.json");
const {readDirDeep} = require("./libs/filesystem");
const logger = require("./libs/logger");

const loadControllers = async () => {
    const controllersFiles = await readDirDeep("./src/server/controllers", {
        type: "file",
        file: {whitelist: /Controller.js$/}
    });
    for (let i = 0; i < controllersFiles.length; i++) {
        try {
            const controller = await require("./controllers/" + controllersFiles[i]);
            await controller({config});
        } catch (err) {
            logger.error(err);
        }
    }
};

const start = () => {
    let port = config.port || 3000;
    server.listen(port, () => {
        logger.log("Server started on port " + port);
    });
};

app.use("/", httpServer);
new SocketServer(io);
loadControllers().catch(err => logger.error(err));
start();