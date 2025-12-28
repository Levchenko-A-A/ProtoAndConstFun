import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import jest from "eslint-plugin-jest";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    ignores: [
      "docs/**",
      "**/.DS_Store",
      "node_modules/**",
      "coverage/**",
      "dist/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    rules: {
      ...js.configs.recommended.rules,
      semi: ["error", "always"], //отсутствие ';'
    },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["src/**/*.test.js"],
    ...jest.configs["flat/recommended"],
  },
  eslintConfigPrettier,
]);
