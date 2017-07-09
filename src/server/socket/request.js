class Request {
    constructor(action, data) {
        this.action = action;
        this.data = data;
    }
}

class SocketRequest extends Request {
    constructor(io, socket, action, data) {
        super(action, data);
        this.io = io;
        this.socket = socket;
    }

    broadcast(data = null) {
        this.io.emit(this.action, data);
    }

    response(data = null) {
        this.socket.emit(this.action, data);
    }
}

module.exports = SocketRequest;