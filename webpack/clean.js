const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function () {
    return {
        plugins: [
            new CleanWebpackPlugin('build', {

                    root: process.cwd(),
                    verbose: true,
                    dry: false

            } )
        ]
    };
};