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
        //target: 'http://www.bigdata-dev.com:8218',
        target: 'http://211.149.184.113:8218',
        //target: 'http://211.149.184.113:8190',
        // target: 'http://192.168.3.21:8108',
        //target: 'http://192.168.3.16:8108',
        //target: 'http://192.168.3.10:8108',
       
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
