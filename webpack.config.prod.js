const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/js/index",
    roomInfo: "./src/js/roomInfo",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name]-[contenthash:8].bundle.js",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery", //這邊以上是新增
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new HtmlWebpackPlugin({
      title: "測試",
      inject: "body",
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      title: "測試分頁",
      inject: "body",
      template: "./src/views/roomInfo.html",
      filename: "views/roomInfo.html",
      chunks: ["roomInfo"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // [css-loader](/loaders/css-loader)
          {
            loader: "css-loader",
          },
          // {
          //   loader: "sass-loader",
          // },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
};
