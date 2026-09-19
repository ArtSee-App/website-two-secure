module.exports = {
  // No core-js polyfill injection: every browser that runs Vue 3 (needs Proxy) already has these built-ins.
  presets: [["@vue/cli-plugin-babel/preset", { useBuiltIns: false }]],
};
