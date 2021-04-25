/// <reference types="cypress" />
const { startDevServer } = require("@cypress/webpack-dev-server");
const { getWebpackConfig } = require("nuxt");

// resolve nuxt tailwind config
const tailwindPostCSSplugin = require("tailwindcss");
const nuxtDefaultTailwindConfig = require("@nuxtjs/tailwindcss/lib/files/tailwind.config");

/**
 * @type Cypress.PluginConfig
 */
module.exports = (on, config) => {
  on("dev-server:start", async options => {
    const webpackConfig = await getWebpackConfig("modern", "dev");

    webpackConfig.module.rules
      // find the laoder for css
      .find(r => r.test.toString().includes("css"))
      // avoid touching anything with modules
      .oneOf.find(l => !l.resourceQuery)
      // find the postcss loader
      .use.find(m => m.loader.includes("postcss"))
      // add the tailwind plugin
      .options.plugins.push(tailwindPostCSSplugin(nuxtDefaultTailwindConfig));

    return startDevServer({
      options,
      webpackConfig
    });
  });

  return config;
};
