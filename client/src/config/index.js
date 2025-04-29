const brand = process.env.BRAND || "ARISTAS".toLowerCase();
let config;

if (window.location.hostname === "localhost") {
  console.log("env local", brand);
  config = require(`./${brand}/local.config.js`);
}

if (window.location.hostname === "aristas-adc75de38188.herokuapp.com") {
  console.log("env dev", brand);
  config = require(`./${brand}/dev.config.js`);
}

if (window.location.hostname === "aristas.com") {
  console.log("env prod", brand);
  config = require(`./${brand}/prod.config.js`);
}

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "aristas-adc75de38188.herokuapp.com"
) {
  console.log(config.config);
}

module.exports = config.config;
