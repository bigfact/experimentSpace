module.exports = {
    entry: './js/entry.js',
    output: {
        path: './js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};