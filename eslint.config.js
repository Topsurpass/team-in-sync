import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
	js.configs.recommended,
	{
		languageOptions: {
			parser: tsparser,
			sourceType: "module",
			ecmaVersion: "latest",
			globals: {
				document: true,
				window: true,
				localStorage: "readonly",
			},
		},
		plugins: {
			prettier,
			"@typescript-eslint": tseslint,
			import: importPlugin,
			react,
			"jsx-a11y": jsxA11y,
		},
		files: ["*.cjs", "**/*.ts", "**/*.tsx"],

		rules: {
			"prettier/prettier": ["error", { useTabs: true, tabWidth: 4 }],
			eqeqeq: ["error", "always"], // Enforce === and !==
			"no-console": "error",
			"no-alert": "warn",
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"no-var": "error",
			"prefer-const": "error",
			"no-debugger": "error",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/ban-ts-comment": "warn",

			// ✅ React-specific rules
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"react/jsx-boolean-value": ["error", "never"],
			"react/jsx-no-useless-fragment": "error",

			// ✅ JSX Accessibility
			"jsx-a11y/anchor-is-valid": "warn",
			"jsx-a11y/no-autofocus": "warn",

			// ✅ Import Rules
			"import/extensions": "off",
			"import/order": [
				"error",
				{ groups: ["builtin", "external", "internal"] },
			], // Organize imports
			"import/no-unresolved": "off",
			"import/no-extraneous-dependencies": "error",
		},
	},
];
