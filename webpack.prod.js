const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TemplatifierWebpackPlugin = require("templatifier-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
    register: "./src/register.js",
    reset_password: "./src/reset_password.js",
    reset_password_confirm: "./src/reset_password_confirm.js",
  },
  output: {
    path: path.resolve(__dirname, "dist/prod/"),
    filename: "js/[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            sourceMaps: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/",
          },
        },
      },
      {
        test: /\.ttf$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/", // This will place your .ttf files in the "fonts/" directory inside the output path
          },
        },
      },
    ],
  },
  plugins: [
    new TemplatifierWebpackPlugin({
      inputFile: "./src/html/index.html",
      outputDirectory: "prod",
    }),
    new TemplatifierWebpackPlugin({
      inputFile: "./src/html/login.html",
      outputDirectory: "prod",
    }),
    new TemplatifierWebpackPlugin({
      inputFile: "./src/html/register.html",
      outputDirectory: "prod",
    }),
    new TemplatifierWebpackPlugin({
      inputFile: "./src/html/reset_password.html",
      outputDirectory: "prod",
    }),
    new TemplatifierWebpackPlugin({
      inputFile: "./src/html/reset_password_confirm.html",
      outputDirectory: "prod",
    }),

    new HtmlWebpackPlugin({
      template: "./src/html/prod/index.html",
      filename: "html/index.html",
      chunks: ["index"],
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/prod/login.html",
      filename: "html/login.html",
      chunks: ["login"],
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/prod/register.html",
      filename: "html/register.html",
      chunks: ["register"],
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/prod/reset_password.html",
      filename: "html/reset_password.html",
      chunks: ["reset_password"],
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/prod/reset_password_confirm.html",
      filename: "html/reset_password_confirm.html",
      chunks: ["reset_password"],
      inject: false,
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].min.css",
    }),

    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false, // Set to true if you want to simulate the cleaning process without actually deleting files
      cleanOnceBeforeBuildPatterns: [
        path.resolve(
          __dirname,
          "../../CUBODE_AGENTS_BE/cubode-agents-be/cubode_agent/assets/html"
        ),
        path.resolve(
          __dirname,
          "../../CUBODE_AGENTS_BE/cubode-agents-be/cubode_agent/static/css"
        ),
        path.resolve(
          __dirname,
          "../../CUBODE_AGENTS_BE/cubode-agents-be/cubode_agent/static/js"
        ),
      ],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "dist/prod/html"),
          to: path.resolve(
            __dirname,
            "../../CUBODE_AGENTS_BE/cubode-agents-be/cubode_agent/assets/html"
          ),
          force: true,
        },
        {
          from: path.resolve(__dirname, "dist/prod/css"),
          to: path.resolve(
            __dirname,
            "../../CUBODE_AGENTS_BE/cubode-agents-be/cubode_agent/static/css"
          ),
          force: true,
        },
        {
          from: path.resolve(__dirname, "dist/prod/js"),
          to: path.resolve(
            __dirname,
            "../../CUBODE_AGENTS_BE/cubode-agents-be/cubode_agent/static/js"
          ),
          force: true,
        },
      ],
    }),
  ],
  mode: "production",
};
