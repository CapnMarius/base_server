global.__serverroot = __dirname;

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const httpServer = require("./http/index");
const SocketServer = require("./socket/index");
const config = require("./config.json");
const {readDirDeep} = require("../libs/filesystem");
const logger = require("../libs/logger");

const controllerData = {
    config, io
};

const loadControllers = async () => {
    const controllersFiles = await readDirDeep(__serverroot + "/modules", {
        type: "file",
        file: {whitelist: /Controller.js$/}
    });
    for (let i = 0; i < controllersFiles.length; i++) {
        try {
            const controller = await require("./modules/" + controllersFiles[i]);
            await controller(controllerData);
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

app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", httpServer);

new SocketServer(io);
loadControllers().catch(err => logger.error(err));
start();