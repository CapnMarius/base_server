const {bash} = require("./shell");

const makeDir = async location => {
    try {
        await bash(`mkdir "${location}"`);
    } catch (err) {
        if (err.indexOf("already exists") !== -1) return true;
        else throw err;
    }
};

const copy = async (source, destination, options = {}) =>
    await bash(`cp -ar${options.overwrite === true ? "f" : "n"}${options.update === true ? "u" : ""} ${source} ${destination}`);

const remove = async location =>
    await bash(`rm -rf ${location}`);

const move = async (source, destination, options = {}) =>
    await bash(`mv -${options.overwrite === true ? "f" : "n"}${options.update === true ? "u" : ""} ${source} ${destination}`);

// const list = async location => {
//     const l = await bash(`ls -axm ${location}`);
//     const arr = l.replace(/\n/g, ", ").split(/, /).splice(2).filter(i => i !== "");
//     console.log(arr);
// };

module.exports = {
    makeDir,
    copy,
    remove,
    move
};