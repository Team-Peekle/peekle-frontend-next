// Polyfill for next/config which was removed in Next.js 16
module.exports = () => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
});
