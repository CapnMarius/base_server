const Connection = require("./connection");
const path = require("path");

class SocketServer {
    constructor(io) {
        io.on("connection", socket => new Connection(this.io, socket));
    }
}

module.exports = SocketServer;