const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js',
        register: './src/register.js'
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
                    'style-loader',
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
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true
    },

    watchOptions: {
        ignored: /node_modules/,
    },

    mode: 'development',
    devtool: 'source-map'
};