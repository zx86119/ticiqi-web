/*
hc 2020-09-09
全局固定参数配置信息
*/
const globalConfig = {
  __timestamp: {
    __timestamp: new Date().getTime(),
  },
  baseUrl: process.env.NODE_ENV === 'development'
    ? '/api'
    : process.env.NODE_ENV === 'production' ? 'http://gzt.gzdata.ydeci.gz.cegn.cn/io' : '',
  nowtab:0
}
//https://gzt.gzdata.ydeci.gz.cegn.cn/io
export {globalConfig}
