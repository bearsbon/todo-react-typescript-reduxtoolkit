module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs,jsx,tsx}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "max-len": [1, 80, 2, { ignoreComments: true }],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx", ".ts"] },
    ],
  },
};
