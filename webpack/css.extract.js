const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const devMode = process.env.NODE_ENV !== 'production';

module.exports = function (paths) {
    return {/*
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },*/
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    //use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                    use: [
                        { loader: 'style-loader', options: { sourceMap: true } },
                        { loader: MiniCssExtractPlugin.loader , options: { sourceMap: true } },
                        { loader: 'css-loader', options: { modules: true, camelCase: true, importLoaders: 1, minimize: true, sourceMap: true } },
                        { loader: 'postcss-loader', options: {ident: 'postcss', plugins: [
                            require('autoprefixer')({}),
                            require('cssnano')({ safe: true, preset: 'default' })
                        ], minimize: true, sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
            ],

        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: './css/[name].[hash].css', disable: false, allChunks: true
                //filename: devMode ? './css/[name].css' : './css/[name].[hash].css',
                //chunkFilename: devMode ? './css/[id].css' : '[id].[hash].css',
            })

        ],
    //
    };
};