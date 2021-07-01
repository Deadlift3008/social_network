const path = require('path');

module.exports = {
    entry: './src/front/index.js',
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'bundle.js',
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
    }
};