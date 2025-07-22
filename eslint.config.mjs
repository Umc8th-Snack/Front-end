import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import security from 'eslint-plugin-security';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    // Ignore patterns
    {
        ignores: ['dist', 'node_modules', '.eslintcache', 'pnpm-lock.yaml', 'eslint.config.mjs'],
    },

    // JavaScript and TypeScript files
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
                ...globals.es2022,
                ...globals.node,
            },
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.app.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'simple-import-sort': simpleImportSort,
            prettier: prettier,
            'jsx-a11y': jsxA11y,
            security: security,
            '@tanstack/query': tanstackQuery,
            import: importPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.app.json',
                },
            },
        },
        rules: {
            // JavaScript/TypeScript rules
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,

            // React rules
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // React 19 Performance rules
            'react/jsx-no-bind': [
                'warn',
                {
                    ignoreDOMComponents: false,
                    ignoreRefs: false,
                    allowArrowFunctions: true,
                    allowFunctions: false,
                    allowBind: false,
                },
            ],
            'react/no-array-index-key': 'warn',
            'react/prefer-stateless-function': 'warn',
            'react/jsx-no-constructed-context-values': 'error',
            'react/no-unstable-nested-components': 'error',

            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/strict-boolean-expressions': 'off', // Too strict for now
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',

            // Import rules
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'import/no-unresolved': 'off', // TypeScript handles this
            'import/no-cycle': 'warn',
            'import/no-unused-modules': 'off',
            'import/no-deprecated': 'warn',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',

            // Accessibility rules
            ...jsxA11y.configs.recommended.rules,
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/anchor-is-valid': 'error',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/label-has-associated-control': 'error',

            // Security rules
            ...security.configs.recommended.rules,
            'react/no-danger': 'error',
            'react/no-danger-with-children': 'error',
            'react/jsx-no-target-blank': [
                'error',
                {
                    allowReferrer: false,
                    enforceDynamicLinks: 'always',
                },
            ],

            // Tanstack Query rules
            ...tanstackQuery.configs.recommended.rules,

            // Prettier integration
            'prettier/prettier': 'error',

            // Disable conflicting rules
            ...prettierConfig.rules,
        },
    },

    // Node.js configuration files
    {
        files: ['vite.config.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.node.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    }
);
