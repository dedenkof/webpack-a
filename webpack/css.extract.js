const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = function (paths) {
    return {
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
        },
        module: {
            rules: [


                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: "css-loader", options: {minimize: true, sourceMap: true } },
                        {
                            loader: "postcss-loader",
                            options: {
                                minimize: true, sourceMap: true,
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        'browsers': ['> 1%', 'last 2 versions']
                                    }),
                                ]
                            }
                        },
                        { loader: "sass-loader", options: {} }
                    ]

                },
            ],

        },


        plugins: [
            new MiniCssExtractPlugin({
                filename: './css/[name].[hash].css'
            })

        ],
    //
    };
};