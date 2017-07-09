const {bash} = require("./shell");

const makeDir = async location => {
    try {
        await bash(`mkdir "${location}"`);
    } catch (err) {
        if (err.indexOf("already exists") !== -1) return true;
        else throw err;
    }
};

const copy = async (source, destination, options = {}) => await bash(`cp -r${options.overwrite === true ? "f " : ""} ${source} ${destination}`);

const remove = async location => await bash(`rm -rf ${location}`);

module.exports = {
    makeDir,
    copy,
    remove,
};