const log = (...args) => {
    console.log(args);
};

const debug = (...args) => {
    console.debug(args);
};

const info = (...args) => {
    console.info(args);
};

const error = (...args) => {
    console.error(args);
};

module.exports = {
    log, debug, info, error
};