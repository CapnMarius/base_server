const exec = require("child_process").exec;

const bash = async (command, stream) => new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
        if (error === null) resolve(stdout);
        else reject(stderr);
    });
    if (typeof stream === "function") {
        process.stdout.on("data", stream);
        process.stderr.on("data", stream);
    }
});

module.exports = {
    bash
};