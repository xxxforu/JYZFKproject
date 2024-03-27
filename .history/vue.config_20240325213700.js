const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://111.230.198.4:7001',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
})