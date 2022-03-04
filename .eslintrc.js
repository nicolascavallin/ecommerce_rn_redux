module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort", "import"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
        "object-curly-spacing": ["warn", "always"],
        quotes: ["warn", "double", { allowTemplateLiterals: true }],
        "@typescript-eslint/no-unused-vars": "warn",
        "react-hooks/exhaustive-deps": "warn",
        "import/named": "off",
        "import/namespace": "off",
        "import/no-cycle": "error",
        "import/order": "warn",
        "import/first": "warn",
        "import/newline-after-import": "warn",
        "import/no-duplicates": "error",
        "sort-imports": [
          "off",
          {
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["single", "multiple", "all", "none"],
            allowSeparatedGroups: false,
          },
        ],
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
      },
    },
  ],
};
