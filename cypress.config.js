const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
require('dotenv').config();

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,

  e2e: {
    specPattern: ["cypress/integration/examples/BDD/**/*.feature", "cypress/integration/examples/BDD/**/*.js"],

    // async setupNodeEvents(on, config) {
    // // Add Cucumber preprocessor plugin
    // await preprocessor.addCucumberPreprocessorPlugin(on, config);

    // // Use Browserify to handle .feature files
    // on("file:preprocessor", browserify.default(config));

    // return config;
    // },

    pageLoadTimeout: 120000,
    setupNodeEvents,


  },
});
