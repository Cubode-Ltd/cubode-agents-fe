const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist/prod/'),
        filename: 'js/[name].bundle.js',
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/prod/index.html',
            filename: 'html/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/prod/login.html',
            filename: 'html/login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/prod/register.html',
            filename: 'html/register.html',
            chunks: ['register']
        }),
    ],
});