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
        filename: '[name].bundle.js',
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
                test: /\.svg$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/login.html',
            filename: 'login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/register.html',
            filename: 'register.html',
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