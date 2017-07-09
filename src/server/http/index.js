const express = require("express");
const path = require("path");
const router = express.Router();
const logger = require("../libs/logger");

router.use((req, res, next) => {
    logger.log('Time: ', new Date());
    next();
});

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/index.html")));
router.use("/public", express.static(path.join(__dirname, "../client/static")));

module.exports = router;