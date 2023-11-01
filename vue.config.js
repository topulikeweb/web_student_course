const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.148.88:8080',
        changeOrigin: true
      }
    }
  }
}
