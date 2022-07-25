import axios from '../index' // 导入http中创建的axios实例

/*
数据报表接口
*/

// 值班记录导出接口：
// /v1/inspection/inspection_day_List_toExcel
// export const getInspectionDayList = (userId, timeIdS, timeIdE) => {
//   return axios({
//     url: `/v1/inspection/inspection_day_List?userId=${userId}&timeIdS=${timeIdS}&timeIdE=${timeIdE}`,
//     method: 'POST'
//   })
// }

export const toExcelInspectionList = (userId, args) => {
  return axios({
    url: `/v1/inspection/inspection_day_List_toExcel?userId=${userId}&timeIdS=${args.timeIdS}&timeIdE=${args.timeIdE}`,
    method: 'POST'
    // data: args
    // {
    //   "timeIdS": "string",
    //   "timeIdE": "string"
    // }
  })
}

// 巡检数据导出接口：
// /v1/ticket/ticket_all_toExcel
export const toExcelAllTicket = (userId, args) => {
  return axios({
    url: `/v1/ticket/ticket_all_toExcel?userId=${userId}&timeIdS=${args.timeIdS}&timeIdE=${args.timeIdE}`,
    method: 'POST'
    // data: args
    // {
    //   "timeIdS": "string",
    //   "timeIdE": "string"
    // }
  })
}
