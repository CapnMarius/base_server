module.exports = {
    "env": {
        "browser": true, "commonjs": true, "es6": true, "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
        }, "ecmaVersion": 8,
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "indent": [
            "warn", 4
        ],
        "no-unused-vars": [
            "warn", {"vars": "all", "args": "after-used", "ignoreRestSiblings": false}
        ],
        "quotes": [
            "warn", "double"
        ],
        "semi": [
            "warn", "always"
        ]
    }
};