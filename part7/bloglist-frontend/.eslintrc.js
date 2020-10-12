module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  "extends": [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [ "react", "jest", "cypress" ],
  "rules": {
    "indent": [
      "error",
      2,
      { 'SwitchCase': 1}
    ],
    "linebreak-style": [
      0,
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    'no-unused-vars': 1,
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ], 
    "no-console": 0,
    "react/prop-types": 0
  }
}