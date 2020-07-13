const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  lintOnSave: false,
  devServer: {
    open: true,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    inline: true,  // 关闭热更新
    proxy: {
      '/api': {
        target: 'http://www.bigdata-dev.com:8108',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      }
    }
  }
};