module.exports = {
    runtimeCompiler: true,
    publicPath: '/',
    devServer: {
      // open: process.platform === 'darwin',
      // host: 'localhost',
      port: 8080,
      // open: true, //配置自動啟動瀏覽器 
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000/', //對應自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
     }, 
  }