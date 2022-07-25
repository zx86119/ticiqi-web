import axios from '../index' // 导入http中创建的axios实例

/*
工单
*/

// 工单回退
// http://test.onelittlestep.net/v1/ticket/ticket_return?ticket_id=110&userId=43
export const postTicketBack = (userId, ticket_id) => {
  return axios({
    url: `/v1/ticket/ticket_return?userId=${userId}&ticket_id=${ticket_id}`,
    method: 'POST'
  })
}

// /v1/ticket/ticket_del
// 工单删除
export const postDeleteGd = (userId, ticket_id) => {
  return axios({
    url: `/v1/ticket/ticket_del?userId=${userId}&ticket_id=${ticket_id}`,
    method: 'POST'
  })
}
