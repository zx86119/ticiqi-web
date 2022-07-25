import axios from '../index' // 导入http中创建的axios实例

/*
cms管理接口
*/

// 提交内容 Newsid为空时新增
// http://test.onelittlestep.net/v1/CMS/CMS_sub?userId=38
export const getCMSSub = (userId, args) => {
  return axios({
    url: `/v1/CMS/CMS_sub?userId=${userId}`,
    method: 'POST',
    data: args
  })
  // {
  //   "newsId": "", // 为空为新增
  //   "title": "文章标题",
  //   "title_shorter": "短标题",
  //   "description": "描述描述一下",
  //   "thumbnail": "图片地址",
  //   "classId": "1",
  //   "content": "握手年内容",
  //   "sts": "是",
  //   "orderStr": "排序"
  //   "category": "string" // 类别 "轮播" 和 ""
  // }
}

// 文章上架，下架
// http://test.onelittlestep.net/v1/CMS/CMS_pub?newsId=1&is_publish=%E6%98%AF&userId=38
export const getCMSPub = (userId, newsId, is_publish) => {
  // is_publish 是、否
  return axios({
    url: `/v1/CMS/CMS_pub?userId=${userId}&newsId=${newsId}&is_publish=${is_publish}`,
    method: 'POST'
  })
}

// 获取文章列表
// http://test.onelittlestep.net/v1/CMS/CMS_getList?is_publish=%E6%98%AF&category=%E8%BD%AE%E6%92%AD
export const getCMSGetList = (is_publish, category) => {
  // is_publish 是、否、空
  return axios({
    url: `/v1/CMS/CMS_getList?is_publish=${is_publish}&category=${category}`,
    method: 'POST'
  })
}

// 获取文章明细
// http://test.onelittlestep.net/v1/CMS/CMS_getDetail?newsId=1
export const getCMSGetDetail = (newsId) => {
  // is_publish 是、否
  return axios({
    url: `/v1/CMS/CMS_getDetail?newsId=${newsId}`,
    method: 'POST'
  })
}
