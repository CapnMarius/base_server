const Validator = require("./eslint-validator");
Validator("./src/", str => console.log(str))
    .then(() => console.log("OK."))
    .catch(err => console.error(err));