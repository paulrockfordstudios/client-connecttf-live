const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


dotenv.config();

const mode = process.env.NODE_ENV || 'development';
// Temperary workaround for 'browserslist' bug that is being patched in the near future
const target = process.env.NODE_ENV === "production" ? 'browserslist' : 'web';

const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './public/favicon.ico',
    }),
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
    }),
];

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = { 
    // mode defaults to 'production' if not set
    mode: mode,
    target: target,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true,
        publicPath: "/",
    },
    devServer: {
        port: 3000,
        //watchContentBase: true,
        //contentBase: "./dist",
        hot: true,
        historyApiFallback: true,
    },
    plugins: plugins,
    module: {
        rules: [
            {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               use: {
                    loader: 'babel-loader',
               }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    'css-loader',
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                type: "asset",
                // asset - splits small images such as icons into inline code, larger images into folder.
                // asset/inline - puts all images to inline code. Images show immediately, longer site load time.
                // asset/resource - puts all images into folder. Images load slower, shorter site load time
            },
            {
                test: /\.(woff2?|ttf|otf)$/,
                use: {
                    loader: 'url-loader',
                }
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css' ],
    },
    devtool: "source-map",
};


//const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
//new CaseSensitivePathsPlugin({debug: true}),

//const { NetlifyPlugin } = require('netlify-webpack-plugin');
/*
    new NetlifyPlugin({
        redirects: [
            {
                from: "/*",
                to: "/index.html",
                status: 200,
                /*
                force: false,
                conditions: {
                language: ["en","es"],
                country: ["US"]
                }
            *//*
            },
        ]
    });
*/

//const ESLintPlugin = require('eslint-webpack-plugin');
/*
    new ESLintPlugin({
        extensions: [`js`, `jsx`, `ts`, 'tsx'],
        exclude: [`node_modules`],
    })
*/