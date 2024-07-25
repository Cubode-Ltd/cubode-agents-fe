const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist/dev/'),
        filename: 'js/[name].bundle.js',
    },
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
      },
    watchOptions: {
        ignored: /node_modules/,
    },
});