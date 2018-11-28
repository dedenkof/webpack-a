const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(paths){
    return {
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,
                    include: paths,
                    cache: false,
                    parallel: true,
                    uglifyOptions: {
                        compress: false,
                        ecma: 6,
                        mangle: true
                    },
                    sourceMap: true
                })
            ]
        }
    }
};