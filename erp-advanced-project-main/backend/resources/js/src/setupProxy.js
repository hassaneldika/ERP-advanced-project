const { createProxyMiddleware } = require("http-proxy-middleware");
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

/**
 * Setup Proxy Settings for the website
 * @param app
 */
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: url,
            changeOrigin: true,
        })
    );
};
