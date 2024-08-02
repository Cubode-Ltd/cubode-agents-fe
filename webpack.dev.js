const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
    entry: {
      index: './src/index.js',
      login: './src/login.js',
      register: './src/register.js',
      reset_password: './src/reset_password.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist/dev/'),
      filename: 'js/[name].bundle.js',
    },
    module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env', '@babel/preset-react'],
                      sourceMaps: true
                  }
              }
          },
          {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
            ],
          },
          {
              test: /\.(svg|png|jpg|jpeg|gif)$/,
              use: {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/',
                  },
              },
          }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/html/index.html',
        filename: 'html/index.html',
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        template: './src/html/login.html',
        filename: 'html/login.html',
        chunks: ['login']
      }),
      new HtmlWebpackPlugin({
        template: './src/html/register.html',
        filename: 'html/register.html',
        chunks: ['register']
      }),
      new HtmlWebpackPlugin({
        template: './src/html/reset_password.html',
        filename: 'html/reset_password.html',
        chunks: ['reset_password']
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
    ],
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      static: {
          directory: path.join(__dirname, 'dist/dev'),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
      historyApiFallback: {
          index: '/html/index.html',
      },
      allowedHosts: [
          '.loca.lt', // Allow Localtunnel's domain
      ],
  },
    watch: true,
    watchOptions: {
      poll: 1000,
      ignored: [
        '**/node_modules',
        '**/dist/**',
        '**/dist',
      ],
    },
};
