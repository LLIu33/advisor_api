module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "Promise": true,
        "Set": true,
        "Symbol": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "printWidth": 120
            }
        ],
        "require-atomic-updates": "off",
        "no-console": 0,
        "eqeqeq": ["error", "always", {"null": "ignore"}],
        "strict": ["error", "global"],
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "no-var": "error"
    }
};
