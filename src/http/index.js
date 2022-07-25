import interceptors from './interceptors'
import { globalConfig } from '@/config'
import qs from 'qs'

/**
 *
 * */
const axios = ({ url, data = {}, method = 'GET', headers = {}, showLoading = false, option = {} }) => {
  return _request(url, data, method, headers, showLoading, option)
}

const _request = (url, data, method, headers, showLoading, option) => {
  const isType = method === 'POST' || method === 'PUT'
  const token = {
    token:
      window.sessionStorage.getItem('openid') ||
      window.sessionStorage.getItem('opentoken') ||
      window.sessionStorage.getItem('wxopenid') ||
      ''
  }
  return new Promise((resolve, reject) => {
    return interceptors({
      url: url.indexOf('http') !== -1 ? url : `${globalConfig.baseUrl}${url}`,
      method: method,
      data: isType ? JSON.stringify(data) : qs.stringify(data),
      params: isType ? {} : Object.assign({}, globalConfig.__timestamp, data),
      // 如果没有appkey那么，就不需要设置，若后端没有配置，那么无法请求成功
      // headers: Object.assign({}, headers),
      headers: Object.assign({}, token, headers),
      // 由于我们已经设置了withCredentials属性，因此发生了错误。您需要调整CORS配置以使用特定的Origin值，而不是通配符，因为在使用凭据时，CORS不支持通配符。
      // withCredentials: true,
      showLoading: showLoading,
      option: option
    })
      .then((res) => {
        // let resOk = res.status.toString().indexOf(2)
        // if (resOk !== -1 || res.data.code === 0) {
        //   resolve(res.data)
        // }
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default axios
