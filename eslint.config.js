import playwright from 'eslint-plugin-playwright'

export default [
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
  },
  {
    files: ['tests/**'],
    rules: {
      'playwright/missing-await': 'error',
      'playwright/prefer-web-first-assertions': 'true',
      'playwright/prefer-lowercase-title': ['warn'],
      'playwright/no-xpath': 'warn',
      'playwright/no-implicit-wait': 'warn',
      'playwright/no-unnecessary-wait-for-selector': 'warn',     
      'playwright/no-useless-not': 'warn',
      'playwright/no-useless-await': 'warn',
    },
  },
]
