class SocketRequest {
    constructor(io, socket, action, data) {
        this.action = action;
        this.data = data;
        this.io = io;
        this.socket = socket;
    }

    getAction() {
        return this.action;
    }

    getData() {
        return this.data;
    }

    getIO() {
        return this.io;
    }

    getSocket() {
        return this.socket;
    }

    broadcast(data = null) {
        this.io.emit(this.action, data);
    }

    response(data = null) {
        this.socket.emit(this.action, data);
    }
}

module.exports = SocketRequest;