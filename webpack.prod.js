const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js',
        register: './src/register.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/prod/'),
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    mode: 'production'
};
