const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // Dependencies ship browser-ready ES2015+; transpiling them only adds polyfill imports.
  transpileDependencies: false,
  // Source maps are not needed in production and roughly double the dist size.
  productionSourceMap: false,
});
