/**
 * ac 2019-12-05.
 * 请求格式
 * let tempData = await $http({
    url: url,
    method: 'get',
    showLoading: true,
   })

 let url = `/api/v1/project/getProPostByProjectId?id=${id}`
 $http({
    url: url,
    method: 'get',
    headers: headers,
    showLoading: false,
  }).then(res => {
    jobData.value = res.data.result
  })

 */
import axios from 'axios'
// import Toast from 'vant/lib/toast'
import { globalConfig } from '@/config'
import { Loading, Message } from 'element-ui'
import { _elementMsg } from '@/utils/element-message'

/**
 * start: 封装http interceptor loading
 */
let loadingCount = 0
let globalLoading = null

// 打开loading
const startLoading = () => {
  globalLoading = Loading.service({
    fullscreen: true,
    background: 'rgba(0,0,0,0.45)',
  })

}

const endLoading = () => {
  // 以服务的方式调用的 Loading 需要异步关闭
  setTimeout(() => {
    globalLoading.close()
  }, 0)
}

const showGlobalLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount++
}

const hideGlobalLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount--
  if (loadingCount === 0) {
    endLoading()
  }
}

// 错误提示信息
const tips = {
  1: '出现了一个错误',
  401: '未登录，未授权',
  3000: '不存在',
  5000: '请检查网络',
}

// 显示错误提示
const _showError = (errorCode) => {
  if (!errorCode) {
    errorCode = 1
  }
  const tip = tips[errorCode]
  // 请求成功但是是其他状态码
  // tip?tip:tips[1]
  Message({
    showClose: true,
    message: `${errorCode} ${(tip ? tip : tips[1])}`,
    type: 'error',
  })
}

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 28,
  baseURL: globalConfig.baseUrl,
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    // 'content-type': 'application/x-www-form-urlencoded'
  },
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
      // 显示loading
      if (config.showLoading) {
        setTimeout(() => {
          showGlobalLoading()
        }, 100)
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
)

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
      // 关闭loading
      if (response.config.showLoading) {
        setTimeout(() => {
          hideGlobalLoading()
        }, 100)
      }
      let resOk = response.status.toString().indexOf(2)
      if (resOk > -1) {
        return response
        // if (response.data.msg === 'success') {
        //   return response
        // } else {
        //   _elementMsg(response.data.msg, 'error')
        // }
      } else {
        setTimeout(() => {
          hideGlobalLoading()
          _elementMsg(`code：${response.data.code} ${response.data.error.msg}`, 'error')
        }, 1000)
      }
    },
    (error) => {
      const { response, config } = error
      // 关闭loading
      if (config.showLoading) {
        setTimeout(() => {
          hideGlobalLoading()
        }, 500)
      }
      if (response) {
        setTimeout(() => {
          _showError(response.status)
        }, 1000)
      }
      // else {
      //   _showError(5000) // 处理断网的情况
      // }
      return Promise.reject(response)
    },
)

export default instance
