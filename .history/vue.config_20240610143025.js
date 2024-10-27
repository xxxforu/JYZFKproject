const {
    defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    rules: [{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    }]
})