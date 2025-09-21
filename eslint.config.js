import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  pluginJs.configs.recommended,
  {
    ...pluginReactConfig,
    files: ["src/**/*.{js,jsx}"],
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
        ...pluginReactConfig.rules,
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off"
    }
  },
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    ignores: ["dist", "node_modules"]
  }
];
