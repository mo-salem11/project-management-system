module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions:{
    ecmaVersion:'lastest',
    sourceType:'module',
    project:['./tsconfig.json','./tsconfig.node.json'],
    tsconfigRootDir:__dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/jsx-runtime', 
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
