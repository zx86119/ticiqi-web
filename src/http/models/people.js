import axios from '../index' // 导入http中创建的axios实例

/*
人员管理接口
*/

// 提交用户 Userid为0时新增，有值是变更（密码使用初始化变更） Groupid:1 管理员/科室经理; Groupid:2 技术部;Groupid:3 台员工
// http://test.onelittlestep.net/v1/users/user_sub
export const postAddUsrsSub = (args) => {
  return axios({
    url: `/v1/users/user_sub`,
    method: 'POST',
    data: args
  })
  // {
  //   "userId": 0,
  //   "username": "xiaoqi",
  //   "name": "小七",
  //   "groupId": "2",
  //   "phone_number": "18333333333",
  //   "password": ""
  // }
}

// 账号启/停用 Sts:启用/停用
// http://test.onelittlestep.net/v1/users/user_onAndOff?userId=1444&sts=%E5%90%AF%E5%8A%A8
export const postUsrsOnAndOff = (userId, sts) => {
  return axios({
    url: `/v1/users/user_onAndOff?userId=${userId}&sts=${sts}`,
    method: 'POST'
  })
}

// 账号密码初始化123
// http://test.onelittlestep.net/v1/users/user_initPwd?userId=155
export const postInitPwd = (userId) => {
  return axios({
    url: `/v1/users/user_initPwd?userId=${userId}`,
    method: 'POST'
  })
}
