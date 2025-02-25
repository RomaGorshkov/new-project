module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended' // Це інтеграція з Prettier
    ],
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, tabWidth: 4 }]
    }
  };