var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (paths) {
    return {
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.css$/,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
                })
            ]
        }
    }
}