module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ["react-refresh","react", "prettier", "@typescript-eslint"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "import",
        "next": "*"
      },
      {
        "blankLine": "never",
        "prev": "*",
        "next": "import"
      }
    ],
    "linebreak-style": ["off"],
    "semi": ["error", "always"],
    "no-console": "error",
    "prettier/prettier": ["error", { "singleQuote": true, "endOfLine": "auto" }],
    "no-undef": "error",
    "no-multi-spaces": "error"
  },
}
