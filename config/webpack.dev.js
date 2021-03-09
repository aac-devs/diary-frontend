const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const { DefinePlugin } = require("webpack");
const { default: merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    contentBase: "../dist",
    open: "chrome",
    hot: true,
    clientLogLevel: "warn", // 'error' | 'silent'
    historyApiFallback: true, // react-router-dom
  },
  target: "web",
  plugins: [
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        PUBLIC_URL: JSON.stringify(path.resolve(__dirname, "../public")),
      },
    }),
  ],
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.(css|sass|scss)$/,
      },
    ],
  },
};

module.exports = merge(common, devConfig);
