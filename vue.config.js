module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    inline: true,  // 关闭热更新
    proxy: {
      '/api': {
        target: 'http://www.bigdata-dev.com:8218',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      }
    }
  }
};