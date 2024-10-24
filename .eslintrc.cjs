module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "node": true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended"
  ],
  ignorePatterns: ["**/*.html"],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    "import/resolver": {
      "node": {
        "extensions": [".js"],
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  },
  plugins: [
    'react-refresh',
    "prettier",
    "import",
    "simple-import-sort",
    "promise",
    "sonarjs",
    "unicorn"
  ],
  rules: {
    // base
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    
    // prettier
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "prettier/prettier": [
      "error",
      {
        "printWidth": 80,
        "tabWidth": 2,
        "useTabs": false,
        "semi": true,
        "singleQuote": true,
        "jsxSingleQuote": true,
        "trailingComma": "none",
        "bracketSpacing": true,
        "bracketSameLine": false,
        "arrowParens": "always",
        "endOfLine": "crlf"
      }
    ],
    
    // simple-import-sort
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/jsx-max-props-per-line": [1, { "when": "always" }],
    "react/jsx-first-prop-new-line": [2, "multiline"]
  },
}
