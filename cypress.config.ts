import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    supportFile: '__tests__/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: '__tests__/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}	',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },

    supportFile: '__tests__/cypress/support/e2e.{js,jsx,ts,tsx}',
    indexHtmlFile: '__tests__/cypress/support/component-index.html',
  },
});
