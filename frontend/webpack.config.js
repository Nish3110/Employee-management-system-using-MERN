const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const outputDirectory = path.join(path.dirname(__dirname), './server/bundle');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: '/src/index.js',
    output: {
        path: outputDirectory,
        filename: 'bundle.js',
        publicPath: `http://localhost:5000`
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //   // you can specify a publicPath here
                    //   // by default it use publicPath in webpackOptions.output
                    //   publicPath: __dirname
                    // }
                },
                "css-loader",
                "sass-loader"
            ]
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            ],

        }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        port: 5000,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:5000'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./js/build/*', './css/build/*'],
            cleanStaleWebpackAssets: false //remove at the time of live
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        })
    ]
};
