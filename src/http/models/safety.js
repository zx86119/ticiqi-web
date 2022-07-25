import axios from '../index' // 导入http中创建的axios实例

// nas公共接口

// http://test.onelittlestep.net/v1/login/userSession
// 登录
export const postLogin = (args) => {
  return axios({
    url: '/v1/login/userSession',
    method: 'POST',
    data: args
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
  })
}

// http://test.onelittlestep.net/v1/ticket/tickets
// 工单
export const getTicketList = () => {
  return axios({
    url: '/v1/ticket/tickets',
    method: 'GET'
  })
}

// 所用工单
// http://test.onelittlestep.net/v1/ticket/ticket_all
export const getAllTicketList = (id, args) => {
  return axios({
    url: `/v1/ticket/ticket_all?userId=${id}&timeIdS=${args.timeIdS}&timeIdE=${args.timeIdE}`,
    method: 'POST'
  })
}

// 新建工单
// http://test.onelittlestep.net/v1/ticket/ticket_sub?userId=34
export const postNewTicket = (id, args) => {
  return axios({
    url: `/v1/ticket/ticket_sub?userId=${id}`,
    method: 'POST',
    data: args
    // {
    //   "name": "string",
    //   "phone": "string",
    //   "department": "string",
    //   "room": "string",
    //   "title": "string",
    //   "description": "string",
    //   "queue_title": "普通工单"
    // }
  })
}

// 指派工单
// http://test.onelittlestep.net/v1/ticket/ticket_assign?userId=34
export const putAssignTicket = (id, args) => {
  return axios({
    url: `/v1/ticket/ticket_assign?userId=${id}`,
    method: 'POST',
    data: args
    // {
    //   "ticket_id": 40,
    //   "assigned_to": 34,
    //   "comment": "这是评论"
    // }
  })
}

// 完结工单
// http://test.onelittlestep.net/v1/ticket/ticket_deal?userId=34
export const postFinishTicket = (id, args) => {
  return axios({
    url: `/v1/ticket/ticket_deal?userId=${id}`,
    method: 'POST',
    data: args
    // {
    //   "ticket_id": 49,
    //   "dealComment": "工单完结",
    //   "finishSts": "是"
    // }
  })
}

// 工单详情（工单经历的历史）
// http://test.onelittlestep.net/v1/ticket/ticket_detail?ticket_id=46
export const postDetailTicket = (id) => {
  return axios({
    url: `/v1/ticket/ticket_detail?ticket_id=${id}`,
    method: 'POST'
  })
}

// 指派给我的工单
// http://test.onelittlestep.net/v1/ticket/ticket_getRecived?userId=36
export const postRecivedTicket = (userId, ticket_stsOver) => {
  return axios({
    url: `/v1/ticket/ticket_getRecived?userId=${userId}&ticket_stsOver=${ticket_stsOver}`,
    method: 'POST'
  })
}

// 工单评级
// http://test.onelittlestep.net/v1/ticket/ticket_comment?userId=33
export const postCommentTicket = (userId, args) => {
  return axios({
    url: `/v1/ticket/ticket_comment?userId=${userId}`,
    method: 'POST',
    data: args

    // {
    //   "comment_id": 13,
    //   "srvComment": "完成不错",
    //   "srvScore": 5
    // }
  })
}

// 获取机房指标等内容
// http://test.onelittlestep.net/v1/inspection/inspection_addr?addr=%E6%B1%87%E8%81%9A%E6%9C%BA%E6%88%BF&userId=38
export const getInspectionAddr = (userId, addr) => {
  return axios({
    url: `/v1/inspection/inspection_addr?userId=${userId}&addr=${addr}`,
    method: 'POST'
  })
  // addr：核心机房/汇聚机房
}

// 提交巡检记录
// http://test.onelittlestep.net/v1/inspection/inspection_sub?userId=38
export const getInspectionSub = (userId, args) => {
  return axios({
    url: `/v1/inspection/inspection_sub?userId=${userId}`,
    method: 'POST',
    data: args
  })
  // {
  //   "addr": "核心机房",
  //   "timeId": "20201206", // 格式：20201206
  //   "content": {}
  // }
}

// 获取巡检日志列表
// http://test.onelittlestep.net/v1/inspection/inspection_getList?userId=38
export const getInspectionList = (userId, timeIdS, timeIdE) => {
  return axios({
    url: `/v1/inspection/inspection_getList?userId=${userId}&timeIdS=${timeIdS}&timeIdE=${timeIdE}`,
    method: 'POST'
  })
}

// 获取巡检日志详细
// http://test.onelittlestep.net/v1/inspection/inspection_getDetail?insId=1&userId=38
export const getInspectionDetail = (userId, addr, timeId, insId) => {
  return axios({
    url: `/v1/inspection/inspection_getDetail?userId=${userId}&addr=${addr}&timeId=${timeId}&insId=${insId}`,
    method: 'POST'
  })
}

// 提交排班 几个拼音Id对应值班科长Id，态势感知Id，技术运维Id，技术运维2Id
// http://test.onelittlestep.net/v1/inspection/inspection_day_user_sub?userId=38
export const getInspectionDayUserSub = (userId, args) => {
  return axios({
    url: `/v1/inspection/inspection_day_user_sub?userId=${userId}`,
    method: 'POST',
    data: args
  })
  // {
  //   "timeId": "38",
  //   "zbkzId": "",
  //   "tsgzId": "",
  //   "jsywId": "",
  //   "jsyw2Id": ""
  // }
}

// 提交值班记录 Sts：正常/异常
// http://test.onelittlestep.net/v1/inspection/inspection_day_record_sub?userId=38
export const getInspectionDayRecord = (userId, args) => {
  return axios({
    url: `/v1/inspection/inspection_day_record_sub?userId=${userId}`,
    method: 'POST',
    data: args
    // {
    //   "timeId": "2020-12-06",
    //   "record": "提价内容部分",
    //   "sts": "正常"
    // }
    // "timeId": "string",
    // "recordTS": "string",
    // "recordYW": "string",
    // "stsTS": "string",
    // "stsYW": "string",
    // "recordTSUserId": "string",
    // "recordYWUserId": "string"
  })
}

// 获取值班记录列表
// http://test.onelittlestep.net/v1/inspection/inspection_day_List?userId=38
// userId timeIdS timeIdE
export const getInspectionDayList = (userId, timeIdS, timeIdE) => {
  return axios({
    url: `/v1/inspection/inspection_day_List?userId=${userId}&timeIdS=${timeIdS}&timeIdE=${timeIdE}`,
    method: 'POST'
  })
}

// 获取物资list
// http://test.onelittlestep.net/v1/material/list
export const getMaterialList = () => {
  return axios({
    url: `/v1/material/list`,
    method: 'GET'
  })
}

//  /v1/material/{material_id}
// 更新物资信息
export const getUpdateMaterial = (id, args) => {
  return axios({
    url: `/v1/material/${id}`,
    method: 'PUT',
    data: args
    // {
    //   "name": "string",
    //   "slug": "string",
    //   "serial_number": "string",
    //   "inventory": 0,
    //   "categories": [
    //     0
    //   ]
    // }
  })
}

// /v1/material/
// 新建物资
export const getNewMaterial = (args) => {
  return axios({
    url: `/v1/material/`,
    method: 'POST',
    data: args
    // {
    //   "name": "string",
    //   "slug": "string",
    //   "serial_number": "string",
    //   "inventory": 0,
    //   "categories": [
    //     0
    //   ]
    // }
  })
}

// 用户信息：
// http://test.onelittlestep.net/v1/users/user_getAll?groupId=2&userId=3

export const getAllUsersList = (groupId, userId) => {
  let url
  if (groupId === '' && userId === '') {
    url = '/v1/users/user_getAll'
  }
  else if (groupId === '' && userId !== '') {
    url = `/v1/users/user_getAll?userId=${userId}`
  }
  else if (groupId !== '' && userId === '') {
    url = `/v1/users/user_getAll?groupId=${groupId}`
  }
  else if (groupId !== '' && userId !== '') {
    url = `/v1/users/user_getAll?groupId=${groupId}&userId=${userId}`
  }
  return axios({
    url: url,
    method: 'GET'
    // groupId值有：1管理员，2技术部，3用户
  })
}

// 新建用户
// http://test.onelittlestep.net/v1/users/?limit=50
export const postNewUsers = (args) => {
  return axios({
    url: `/v1/users/`,
    method: 'POST',
    data: args

    // {
    //   "username": "string",
    //   "phone_number": "string",
    //   "forbidden": false,
    //   "groups": [
    //     0
    //   ],
    //   "password": "string"
    // }
  })
}

// /api/token/
// export const postLogin = (data) => {
//   return axios({
//     url: '/api/token/',
//     data: data,
//     method: 'POST',
//     headers: {
//       name: 'hc'
//     },
//     option: {
//       name: 'll'
//     }
//   })
// }
