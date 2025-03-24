const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  // viewportHeight: 932,
  // viewportWidth: 430,
  e2e: {
    specPattern: 'cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    baseUrl: 'https://example.cypress.io',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
  },
});