const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
                filename: './css/[name].[contenthash].css', disable: false, allChunks: true
            })

        ],
    };
};