const webpack = require('webpack');
const path = require('path');

// process.noDeprecation = true

module.exports = {
    entry: './dist/src/app.js',
    output: {
        path: path.resolve('./public/js'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}]],
                    plugins: ['syntax-dynamic-import']
                }
            }]
        }]
    },
    resolve: {
        alias: {
            ol: "openlayers/dist/ol.js"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            ol: "openlayers"
        })
    ],
    node: {
        fs: "empty"
    }
};

