const ESLint = require("../libs/eslint");
const {readDirDeep} = require("../libs/filesystem");

const buildJsFileList = async location => readDirDeep(location, {
    dir: {
        blacklist: /client|database/
    },
    file: {
        whitelist: /\.js$/
    }
});

const validate = async (location, stream) => {
    const jsFiles = await buildJsFileList(location);
    await ESLint(jsFiles, stream);
};

module.exports = validate;