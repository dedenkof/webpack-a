/*Подключаем базовый модуль Node.js path поможет работать приложению кроссплатформенно
 поскольку путь к файлу будет определен везде одинаково вне зависимости от платформы*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const js = require('./webpack/babel');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglyfy');
const images = require('./webpack/images');
const favicon = require('./webpack/favicon');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/sass.lint');
const cleanBuild = require('./webpack/clean');

/*PATH объект в которые мы поместим 2 свойства
 source исходники приложений и build куда будут помещаться результаты работы webpack*/
const PATHS = {
    source: path.resolve(__dirname, 'source'),
    build: path.resolve(__dirname, 'build'),
};

// общая точка входа для прода и девелоп
const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js',
            'blog': PATHS.source + '/pages/blog/blog.js',
        },
        // Описывает список файлов и директорий результат работы webpack
        output: {
            path: PATHS.build,
            // name это плейсхолдер в который автоматически будут подставляться имена точек входа entry нашего приложения
            filename: 'js/[name].[chunkhash].js',
        },
        /*plugins идет перечисление плагинов которые кастомизируют процесс сборки webpack
         В нашем случае это один плагин который создает html файл с заданным title*/

        optimization: {
            splitChunks: {
                cacheGroups: {
                    'common': {
                        name: 'common',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        priority: 1,
                    },
                },
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                hash: true,
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/pages/index/index.pug',
                title: 'Главная',
                custom: 'Custom'
            }),
            new HtmlWebpackPlugin({
                inject: false,
                hash: true,
                filename: 'blog.html',
                chunks: ['blog', 'common'],
                template: PATHS.source + '/pages/blog/blog.pug',
                title: 'Блог',
                custom: 'Custom'
            }),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),

        ],
    },
    cleanBuild(),
    pug(),
    images(),
    lintJS({paths: PATHS.sources}),
    lintCSS(),
]);

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            uglifyJS(),
            favicon(),
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            sass(),
            css(),
            js(),
        ]);
    }
};