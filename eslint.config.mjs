import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import storybook from 'eslint-plugin-storybook';

export default antfu(
  {
    react: true,
    typescript: true,

    // Configuration preferences
    lessOpinionated: true,
    isInEditor: false,

    // Code style
    stylistic: {
      semi: true,
    },

    // Format settings
    formatters: {
      css: true,
    },

    // Ignored paths
    ignores: [
      'migrations/**/*',
    ],
  },
  // --- Next.js Specific Rules ---
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  // --- Accessibility Rules ---
  jsxA11y.flatConfigs.recommended,
  // --- Testing Rules ---
  {
    files: [
      '**/*.test.ts?(x)',
    ],
    ...jestDom.configs['flat/recommended'],
  },
  // --- E2E Testing Rules ---
  {
    files: [
      '**/*.spec.ts',
      '**/*.e2e.ts',
    ],
    ...playwright.configs['flat/recommended'],
  },
  // --- Storybook Rules ---
  ...storybook.configs['flat/recommended'],
  // --- Custom Rule Overrides ---
  {
    rules: {
      // Core rules - relaxed
      'antfu/no-top-level-await': 'off',
      'style/brace-style': ['error', '1tbs'],
      'ts/consistent-type-definitions': 'off',
      'react/prefer-destructuring-assignment': 'off',
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': 'off',
      
      // TypeScript rules - relaxed
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      
      // React rules - relaxed
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      
      // Import rules - relaxed
      'import/order': 'off',
      'import/no-default-export': 'off',
      'import/no-mutable-exports': 'off',
      
      // Style rules - relaxed
      'style/comma-dangle': 'off',
      'style/quote-props': 'off',
      'style/quotes': 'off',
      'style/semi': 'off',
      'style/indent': 'off',
      'style/no-trailing-spaces': 'off',
      
      // Perfectionist rules - relaxed
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-exports': 'off',
      
      // Test rules
      'test/padding-around-all': 'off',
      'test/prefer-lowercase-title': 'off',
      
      // Console and debugging
      'no-console': 'off',
      'no-debugger': 'warn',
      
      // Unicorn rules - relaxed
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
);
