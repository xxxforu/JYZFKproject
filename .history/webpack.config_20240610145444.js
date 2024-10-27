// webpack.config.js
const path = require('path');
const {
    devtools
} = require('vue');
module.exports = {
    mode: 'development',
    entry: './src/main.js', // 入口文件路径
    output: {
        filename: 'bundle.js', // 输出文件名称
        path: path.resolve(__dirname, 'dist') // 输出文件目录路径
    },
    module: {
        rules: [{
            test: /\.css$/, // 通过正则表达式匹配所有以.css后缀的文件
            use: [ // 要使用的加载器，这两个顺序一定不要乱
                'style-loader',
                'css-loader'
            ]
        }]
    },
    devtool: 'source-map'

};