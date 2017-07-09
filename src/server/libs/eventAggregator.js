class EA {
    constructor() {
        this.subs = {};
    }

    off(event, id) {
        this.subs[event].splice(this.subs[event].findIndex(({_id}) => _id === id), 1);
    }

    on(event, fn, once = false) {
        const id = Math.random();
        const off = () => this.off(event, id);
        if (this.subs[event] === undefined) this.subs[event] = [];
        this.subs[event].push({_id: id, _fn: fn, once});
        return {off};
    }

    once(event, fn) {
        return this.on(event, fn, true);
    }

    emit(event, data) {
        if (this.subs[event] !== undefined) {
            for (let i = 0; i < this.subs[event].length; i++) {
                const sub = this.subs[event][i];
                if (typeof sub._fn === "function") {
                    sub._fn(data);
                    if (sub.once === true) {
                        this.off(event, sub._id);
                        i--;
                    }
                } else {
                    this.off(event, sub._id);
                    i--;
                }
            }
        }
    }
}

EA.get = type => {
    if (EA.ea === undefined) {
        EA.ea = {};
    }
    if (EA.ea[type] === undefined) {
        EA.ea[type] = new EA();
    }
    return EA.ea[type];
};

module.exports = EA;