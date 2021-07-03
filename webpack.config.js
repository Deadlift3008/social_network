const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const entryMap = {};

fs.readdirSync('./src/pages/')
    .filter(file => {
        return file.match(/.*\.jsx?$/);
    })
    .forEach(f => {
        entryMap[f.replace(/\.jsx?$/, '')] = ['./src/pages/' + f];
    });

module.exports = {
    entry: entryMap,
    mode: process.env.NODE_ENV || 'development',
    watch: process.env.NODE_ENV !== 'production',
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: [".js", ".json", ".jsx", ".css"]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};