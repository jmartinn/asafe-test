import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// For Next.js specific configs
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  js.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  prettierRecommended,

  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),

  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },

  {
    settings: {
      'tailwindcss': {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.ts',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',

      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'object',
          ],
          'pathGroups': [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal' },
          ],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],

      // Tailwind rules
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Ignores
  {
    ignores: ['dist/**', 'node_modules/**', '.next/**'],
  },
];

export default eslintConfig;
