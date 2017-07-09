const Datastore = require("nedb");
const db = {
    sub: new Datastore({filename: "./database/sub", autoload: true}),
    admin: new Datastore({filename: "./database/admin", autoload: true})
};

const insert = (collection, ...docs) => new Promise((resolve, reject) => {
    if (collection in db) {
        db[collection].insert(docs, (err, newDocs) => {
            if (err === null) resolve(newDocs);
            else reject(err);
        });
    } else {
        reject(new Error("Collection does not exist."));
    }
});

const update = (collection, query, update, options) => new Promise((resolve, reject) => {
    if (collection in db) {
        db[collection].update(query, update, options, (err, newDocs) => {
            if (err === null) resolve(newDocs);
            else reject(err);
        });
    } else {
        reject(new Error("Collection does not exist."));
    }
});

const remove = (collection, query, options = {multi: true}) => new Promise((resolve, reject) => {
    if (collection in db) {
        db[collection].remove(query, options, (err, newDocs) => {
            if (err === null) resolve(newDocs);
            else reject(err);
        });
    } else {
        reject(new Error("Collection does not exist."));
    }
});

const find = (collection, query, options = {}) => new Promise((resolve, reject) => {
    if (collection in db) {
        if (options.one === true) {
            db[collection].findOne(query, function (err, docs) {
                if (err === null) resolve(docs);
                else reject(err);
            });
        } else {
            db[collection].find(query, function (err, docs) {
                if (err === null) resolve(docs);
                else reject(err);
            });
        }
    } else {
        reject(new Error("Collection does not exist."));
    }
});

module.exports = {
    insert,
    find,
    remove,
    update
};
