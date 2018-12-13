const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
                            {
                            loader: 'css-loader',
                            option: {
                                minimize: true,
                                modules: true,
                                importLoaders: 1
                            }
                            },
                            {
                                loader: 'sass-loader'

                        }
                        ],

                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    }),
                },
            ],

        },
        plugins: [
            new ExtractTextPlugin('./css/[name].css'),
        ],
    };
};