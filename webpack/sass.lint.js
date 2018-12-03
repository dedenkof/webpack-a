const styleLintPlugin = require('stylelint-webpack-plugin');

module.exports = function() {
    return {
        plugins: [
            new styleLintPlugin({
                configFile: './.stylelintrc',
            }),
        ],
    };
};