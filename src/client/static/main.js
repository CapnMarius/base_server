const socket = io(location.origin || "http://127.0.0.1");
class Request {
    constructor(action) {
        this.action = action;
        this.subs = [];

        socket.on(this.action, data => {
            for (let i = 0; i < this.subs.length; i++) {
                const sub = this.subs[i];
                if (typeof sub._fn === "function") {
                    sub._fn(data);
                    if (sub.once === true) {
                        this.off(sub._id);
                        i--;
                    }
                } else {
                    this.off(sub._id);
                    i--;
                }
            }
        });
    }

    off(id) {
        this.subs.splice(this.subs.findIndex(({_id}) => _id === id), 1);
    }

    send(data) {
        socket.emit("route", {action: this.action, data});
        return this;
    }

    receive(fn, once = false) {
        const id = Math.random();
        const off = () => this.off(id);
        this.subs.push({_id: id, _fn: fn, once});
        return {off};
    }

    receiveOnce(fn) {
        return this.receive(fn, true);
    }
}

const testTestEvent = new Request("socketTest.test").send("test").receive(data => console.log("always", data));