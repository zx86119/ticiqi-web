import axios from '../index' // 导入http中创建的axios实例

/*
物资管理接口
*/

// 物资列表查询
//http://test.onelittlestep.net/v1/material/material_getList?userId=38
export const getWzList = (userId) => {
  return axios({
    url: `/v1/material/material_getList?userId=${userId}`,
    method: 'GET'
  })
}

// 物资新增/修改
// http://test.onelittlestep.net/v1/material/material_sub?userId=38
export const getWzSub = (userId, args) => {
  return axios({
    url: `/v1/material/material_sub?userId=${userId}`,
    method: 'POST',
    data: args

    //  "materialId": 7,
    //  "name": "交换机",
    //  "model": "H3C-S1850",
    //  "unit": "个",
    //  "inventory": 4,
    //  "categoryId": "1",
    //  "orderStr": "001001"
  })
}

// 出入库 Amount为正数是入库，负数是出库
// http://test.onelittlestep.net/v1/material/material_changeLog?userId=38
export const getWzChange = (userId, args) => {
  return axios({
    url: `/v1/material/material_changeLog?userId=${userId}`,
    method: 'POST',
    data: args
    // 出入库 Amount为正数是入库，负数是出库
    // {
    //   "materialId": "string",
    //   "amount": "string",
    //   "log": "string",
    //   "logName": "string",
    //   "logPhone": "string"
    // }
  })
}

// 出入库明细查询
// http://test.onelittlestep.net/v1/material/material_getLog?userId=38&materialId=7
export const getWzDetail = (userId, materialId) => {
  return axios({
    url: `/v1/material/material_getLog?userId=${userId}&materialId=${materialId}`,
    method: 'GET'
  })
}
