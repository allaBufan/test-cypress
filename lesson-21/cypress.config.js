import { defineConfig } from "cypress";
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';
import allureWriter from "@shelex/cypress-allure-plugin/writer.js";
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin.js'
import * as path from 'path';
import * as fs from 'fs';

const getConfigFile = (env) => {
  const configFilePath = path.join('cypress', 'fixtures', 'configFiles', `cypress.${env || 'dev'}.config.json`);
  return (fs.readFileSync(configFilePath)).toString()
}

export default defineConfig({
  retries: {
    runMode: process.env.CI ? 2 : 0,
    openMode: 0
  },
  video: true,
  viewportHeight: 720,
  viewportWidth: 1080,
  // reporter: '@shelex/cypress-allure-plugin',
  reporter: "cypress-mochawesome-reporter",
  reporterOption: {
    //reportDir: 'mochawesome-report',
    //reportFilename: "[status]_[datetime]-[name]-report",
    overwrite: false,
    html: true,
    // generate intermediate JSON reports
    json: false
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    env: {
      snapshotOnly: true
    },
    setupNodeEvents(on, config) {
      mochawesome(on)
      allureWriter(on, config)
      addMatchImageSnapshotPlugin(on)
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      });

      const configOverrides = getConfigFile(config.env.TEST_ENVIRONMENT)
      config = {...config, ...JSON.parse(configOverrides)}
      // congig.env.DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD
      // config.baseUrl = config.env.BASE_URL || 'https://qauto.forstudy.space';
      // console.log(config.baseUrl);
      return config;
    },
  },
});