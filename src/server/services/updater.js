const {minute} = require("../libs/utils");
const {bash} = require("../libs/shell");
const sfs = require("../libs/shellfs");
const {pull, reset} = require("../libs/git");
const {writeTextFile, readDirDeep} = require("../libs/filesystem");
const Validator = require("../../eslint/eslint-validator");

const job = async () => {
    await reset();
    const pullRes = await pull();

    if (pullRes.indexOf("up-to-date") === -1) {
        const backupLocation = "../base_server_backup_" + Date.now() + "/";
        await sfs.makeDir(backupLocation);
        const bckplist = await readDirDeep("./", {depth: 0, dir: {blacklist: /node_modules|.idea/}});
        for (let i = 0; i < bckplist.length; i++) {
            await sfs.copy(bckplist[i], backupLocation);
        }

        try {
            await Validator("./src/", out => console.log(out));
            await sfs.remove(backupLocation);
            await bash("systemctl restart base_server");
        } catch (errors) {
            try {
                await sfs.copy(backupLocation + "*", "./");
                await sfs.remove(backupLocation);
            } catch (err) {
                console.error(err);
            }
            await sfs.remove("./log.txt");
            await writeTextFile("./log.txt", errors);
        }
    }
};

setInterval(job, minute(30));
job();