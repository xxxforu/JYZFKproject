// webpack.config.js
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js', // 入口文件路径
    output: {
        filename: 'bundle.js', // 输出文件名称
        path: path.resolve(__dirname, 'dist') // 输出文件目录路径
    },

};