'use strict'

let webpack = require('webpack');
let paths = require('paths');

module.exports = {
    entry: './app/main.js',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    context: __dirname,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.sass$/,
                include: paths.appSrc,
                loaders: ["style", "css", "sass"]
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192' 
            }
        ]
    }
};