const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'gzt',
  // productionSourceMap: process.env.NODE_ENV === 'production',
  productionSourceMap: false,
  devServer: {
    port: 2211,
    host: '0.0.0.0',
    open: false, // 不自动打开浏览器
    // 代理配置
    // 使用“/api/posts/1” 代理到：http://59.215.222.175:8181/posts/1
    // http://42.193.50.133/io/news_out/get_column
    // http://42.193.50.133:10081/io  // 开发接口地址
    // http://172.22.136.10:10081/io // 2021-6-11 部署接口地址
    proxy: {
      '/api': {
        // target: 'http://42.193.50.133:10081/io', // 设置你调用的接口域名和端口号 别忘了加http
        target: 'http://www.utourvlog.com/gztIo/io', // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  // 设置别名
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },

  pluginOptions: {
    'style-resources-loader': {
      // preProcessor: 'less',
      // patterns: [ path.resolve(__dirname, './src/common/style/index.less') ]

      preProcessor: 'less',
      patterns: [
        // 这个是加上自己的路径，
        // 注意：试过不能使用别名路径
        path.resolve(__dirname, './src/common/style/variable.less'),
      ],
    },
  },
}
