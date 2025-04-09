const localConfig = {
  hostname: "localhost",
  baseUrl: "http://localhost:3000",
  devMode: true,
};

const devConfig = {
  hostname: "localhost",
  baseUrl: "http://localhost:3000",
  devMode: true,
};

const prodConfig = {
  hostname: "localhost",
  baseUrl: "http://localhost:3000",
  devMode: true,
};

let config;

if (window.location.hostname === localConfig.hostname) {
  console.log("env local");
  config = require("./local.config.js");
}

if (window.location.hostname === devConfig.hostname) {
  console.log("env dev");
  config = require("./dev.config.js");
}

if (window.location.hostname === prodConfig.hostname) {
  console.log("env prod");
  config = require("./prod.config.js");
}

module.exports = config;
