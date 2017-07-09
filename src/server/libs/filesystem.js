const FS = require("fs");

const readDir = (location, limit = 100) => new Promise((resolve, reject) => {
    if (location.slice(-1) !== "/") {
        location = location + "/";
    }
    FS.readdir(location, (err, children) => {
        if (err === null) {
            if (limit === -1) resolve(children);
            else resolve(children.splice(-limit));
        }
        else reject(err);
    });
});

const filter = (location, options = {}) => {
    if (options.blacklist instanceof RegExp) {
        return (location.match(options.blacklist) === null);
    }
    if (options.whitelist instanceof RegExp) {
        return (location.match(options.whitelist) !== null);
    }
    return true;
};

const readDirDeep = async (location, options = {}, depth = 0) => {
    let nested = [];
    if (location.slice(-1) !== "/") {
        location = location + "/";
    }
    let children = await readDir(location);
    for (let i = 0; i < children.length; i++) {
        const child = location + children[i];
        if (FS.statSync(child).isDirectory()) {
            if (options.type === undefined || options.type === "dir") {
                if (filter(children[i], options.dir)) {
                    nested.push(children[i]);
                }
            }
            if (options.depth === undefined || options.depth > depth) {
                if (filter(children[i], options.dir)) {
                    depth++;
                    nested = nested.concat((await readDirDeep(child, options, depth)).map(n => children[i] + "/" + n));
                    depth--;
                }
            }
        } else {
            if (options.type === undefined || options.type === "file") {
                if (filter(children[i], options.file)) {
                    nested.push(children[i]);
                }
            }
        }
    }

    return nested;
};

const writeBufferFile = (location, buffer) => new Promise((resolve, reject) => {
    FS.writeFile(location, buffer, err => {
        if (err === null) resolve();
        else reject(err);
    });
});

const readBufferFile = (location) => new Promise((resolve, reject) => {
    FS.readFile(location, "buffer", (err, buffer) => {
        if (err === null) resolve(buffer);
        else reject(err);
    });
});

const writeTextFile = (location, text) => new Promise((resolve, reject) => {
    FS.writeFile(location, "utf8", (err, text) => {
        if (err === null) resolve(text);
        else reject(err);
    });
});

const appendTextFile = (location, text) => new Promise((resolve, reject) => {
    FS.appendFile(location, text, "utf8", err => {
        if (err === null) resolve();
        else reject(err);
    });
});

const readTextFile = (location) => new Promise((resolve, reject) => {
    FS.readFile(location, text, "utf8", err => {
        if (err === null) resolve();
        else reject(err);
    });
});

const existsFile = location => new Promise((resolve, reject) => {
    FS.stat(location, (err, stat) => {
        if (err === null && stat.isFile() === true) resolve();
        else reject(err);
    });
});

const existsDir = location => new Promise((resolve, reject) => {
    FS.stat(location, (err, stat) => {
        if (err === null && stat.isDirectory() === true) resolve();
        else reject(err);
    });
});

const move = async (source, destination) => new Promise((resolve, reject) => {
    FS.rename(source, destination, err => {
        if (err === null) resolve();
        else reject(err);
    });
});

const removeFile = async location => new Promise((resolve, reject) => {
    existsFile(location).then(() => {
    FS.unlink(source, err => {
        if (err === null) resolve();
        else reject(err);
    });
    }).catch(() => resolve());
});

const copy = async (source, destination, options) => new Promise(async (resolve, reject) => {
    const exec = () => {
        let cbCalled = false;
        const done = err => {
            if (!cbCalled) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
                cbCalled = true;
            }
        };

        const rd = FS.createReadStream(source);
        rd.on("error", done);

        const wr = FS.createWriteStream(destination);
        wr.on("error", done);
        wr.on("close", () => done());
        rd.pipe(wr);
    };

    try {
        await existsFile(destination);
        if (options !== undefined && options.overwrite === true) {
            await removeFile(destination);
            exec();
        } else {
            resolve();
        }
    } catch (err) {
        exec();
    }
});

module.exports = {
  readDirDeep,
    readDir,
    copy,
    move,
    removeFile,
    existsFile,
    existsDir,
    writeTextFile,
    readTextFile,
    appendTextFile,
    writeBufferFile,
    readBufferFile
};