process.traceDeprecation = true;

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './dist/src/app.js',
    output: {
        path: path.resolve('./public/js'),
        filename: 'main.bundle.2.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}]],
                    plugins: ['syntax-dynamic-import']
                }
            }]
        }]
    }
};

