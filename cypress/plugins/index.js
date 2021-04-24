/// <reference types="cypress" />
const { startDevServer } = require("@cypress/webpack-dev-server");
const { getWebpackConfig } = require("nuxt");
const tailwindPostCSSplugin = require("tailwindcss");

/**
 * @type Cypress.PluginConfig
 */
module.exports = (on, config) => {
  on("dev-server:start", async options => {
    const webpackConfig = await getWebpackConfig("modern", {
      for: "dev",
      configOverides: {
        tailwindcss: {
          jit: false
        }
      }
    });

    webpackConfig.module.rules
      // find the laoder for css
      .find(r => r.test.toString().includes("css"))
      // avoid touching anything with modules
      .oneOf.find(l => !l.resourceQuery)
      // find the postcss loader
      .use.find(m => m.loader.includes("postcss"))
      // add the tailwind plugin
      .options.plugins.push(tailwindPostCSSplugin());

    return startDevServer({
      options,
      webpackConfig
    });
  });

  return config;
};
