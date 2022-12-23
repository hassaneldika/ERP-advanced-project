const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * Setup Proxy Settings for the website
 * @param app
 */
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
    })
  );
};
