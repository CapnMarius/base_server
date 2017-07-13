const instances = {};

module.exports = (namespace, obj, data) => {
    if (instances[namespace] === undefined) {
        instances[namespace] = new obj(data);
    }
    return instances[namespace];
};