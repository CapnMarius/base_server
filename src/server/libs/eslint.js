const {bash} = require("./shell");

const ESLint = async (jsFiles, stream) => {
    const errors = [];
    for (let i = 0; i < jsFiles.length; i++) {
        if (typeof stream === "function") {
            stream("validating " + jsFiles[i]);
        }
        try {
            await bash("eslint " + jsFiles[i], res => {
                if (res.length > 0) {
                    if (typeof stream === "function") {
                        stream(res);
                    }
                    errors.push(res);
                } else {
                    if (typeof stream === "function") {
                        stream("OK.");
                    }
                }
            });
        } catch (err) {
            errors.push(err);
        }
    }
    if (errors.length > 0) {
        throw new Error(errors);
    }
};

module.exports = ESLint;