const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (paths) {
    return {
        plugins: [
            new CleanWebpackPlugin(['PATHS.build']),
        ]
    };
};