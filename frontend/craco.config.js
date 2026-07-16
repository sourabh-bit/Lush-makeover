// craco.config.js
const path = require("path");
require("dotenv").config();

module.exports = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      // Reduce the set of watched directories in development
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/build/**",
          "**/dist/**",
          "**/coverage/**",
          "**/public/**",
        ],
      };
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    // Remove deprecated webpack-dev-server v4 options that are no longer
    // supported in webpack-dev-server v5 (still emitted by react-scripts 5.0.1)
    if (devServerConfig) {
      delete devServerConfig.onAfterSetupMiddleware;
      delete devServerConfig.onBeforeSetupMiddleware;
      // webpack-dev-server v5 moved `https` into the `server` option
      if (devServerConfig.https !== undefined) {
        const httpsVal = devServerConfig.https;
        delete devServerConfig.https;
        devServerConfig.server = httpsVal
          ? { type: "https", options: typeof httpsVal === "object" ? httpsVal : undefined }
          : "http";
      }
      devServerConfig.allowedHosts = "all";
    }
    return devServerConfig;
  },
};
