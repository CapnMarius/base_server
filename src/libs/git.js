const {bash} = require("./utils");

const reset = async stream => bash("git fetch origin && git reset --hard origin/master", stream);
const pull = async stream => bash("git pull", stream);
const add = async stream => bash("git add .", stream);
const commit = async (msg, stream) => bash("git commit -m '" + msg + "'", stream);
const push = async stream => bash("git push", stream);
const status = async stream => bash("git status", stream);

module.exports = {
    reset,
    pull,
    add,
    commit,
    push,
    status
};