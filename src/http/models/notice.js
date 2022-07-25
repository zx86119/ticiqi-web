import axios from '../index' // 导入http中创建的axios实例

/*
通知设置接口
*/

// 通知列表
// http://test.onelittlestep.net/v1/notice/notice_getList?sts=%E6%98%AF
export const getNoticeList = (sts) => {
  // 是、否、传空查全部
  return axios({
    url: `/v1/notice/notice_getList?sts=${sts}`,
    method: 'POST'
  })
}

// 新增、修改通知
// http://test.onelittlestep.net/v1/notice/notice_sub?userId=38
export const getNoticeSub = (userId, args) => {
  // 是、否、传空查全部
  return axios({
    url: `/v1/notice/notice_sub?userId=${userId}`,
    method: 'POST',
    data: args
    // {
    //   "noticeId": "", // 为空为新增
    //   "title": "通知",
    //   "content": "内容",
    //   "sts": "是",
    //   "orderStr": "",
    //   "speed": "15"
    // }
  })
}

// 上线、下线通知
// http://test.onelittlestep.net/v1/notice/notice_pub?noticeId=1&sts=%E5%90%A6&userId=38
export const getNoticePub = (userId, noticeId, sts) => {
  return axios({
    url: `/v1/notice/notice_pub?userId=${userId}&noticeId=${noticeId}&sts=${sts}`,
    method: 'POST'
  })
}
