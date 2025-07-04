import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import tailwindcss from 'eslint-plugin-tailwindcss'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // Ignore patterns
  {
    ignores: ['dist', 'node_modules', '.eslintcache', 'pnpm-lock.yaml', 'eslint.config.mjs']
  },
  
  // JavaScript and TypeScript files
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'tailwindcss': tailwindcss,
      'simple-import-sort': simpleImportSort,
      'prettier': prettier
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // JavaScript/TypeScript rules
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      
      // React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      
      // TailwindCSS rules
      ...tailwindcss.configs.recommended.rules,
      'tailwindcss/no-custom-classname': 'off', // Allow custom classes for v4 @theme
      
      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      
      // Prettier integration
      'prettier/prettier': 'error',
      
      // Disable conflicting rules
      ...prettierConfig.rules
    }
  },
  
  // Node.js configuration files
  {
    files: ['vite.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.node.json',
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
)