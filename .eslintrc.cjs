module.exports = {
  plugins: ['tailwindcss', '@tanstack/query', 'import'],
  extends: [
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'plugin:@tanstack/query/recommended',
  ],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          ['internal', 'parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-query,**/query',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '{app/components/**,app/**/components/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'hoooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '{styles/**,images/**}',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
};
