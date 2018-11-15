/*Подключаем базовый модуль Node.js path поможет работать приложению кроссплатформенно
поскольку путь к файлу будет определен везде одинаково вне зависимости от платформы*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*PATH объект в которые мы поместим 2 свойства
source исходники приложений и build куда будут помещаться результаты работы webpack*/
const PATHS = {
    source: path.join(__dirname, 'source'),
    build:  path.join(__dirname, 'build')
};

// Експорт модуля Node.js
module.exports = {
    /*Точка входа нашего приложения (для много страничного сайта можно сделать отдельной точкой входа для каждой страницы)
    Точками входа могут быть только те модули которые не используются другими модулями вашего приложения
    У нас н-р index.js использует другой модуль menu.js но сам index.js больше не используется никаким другим модулем*/
    entry: {
        'index': PATHS.source + '/pages/index/index.js',
        'blog': PATHS.source + '/pages/blog/blog.js',
    },
    // Описывает список файлов и директорий результат работы webpack
    output: {
        path: PATHS.build,
        // name это плейсхолдер в который автоматически будут подставляться имена точек входа entry нашего приложения
        filename: '[name].js'
    },
    /*plugins идет перечисление плагинов которые кастомизируют процесс сборки webpack
    В нашем случае это один плагин который создает html файл с заданным title*/
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: PATHS.source + '/pages/index/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            chunks: ['blog'],
            template: PATHS.source + '/pages/blog/blog.pug'
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    }
};