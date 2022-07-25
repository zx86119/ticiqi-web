const formatDate = function() {
  let time, YYYYMMDD
  let now = new Date()
  let year = now.getFullYear()       //年
  let month = now.getMonth() + 1     //月
  let day = now.getDate()            //日
  let hh = now.getHours()            //时
  let mm = now.getMinutes()          //分
  let ss = now.getSeconds()           //秒
  time = year + '-'
  YYYYMMDD = year + '-'
  if (month < 10) {
    time += '0'
    time += month + '-'
    YYYYMMDD += '0'
    YYYYMMDD += month + '-'
  } else {
    time += month + '-'
    YYYYMMDD += month + '-'
  }
  if (day < 10) {
    time += '0'
    time += day + ' '
    YYYYMMDD += '0'
    YYYYMMDD += day
  } else {
    time += day + ' '
    YYYYMMDD += day
  }
  if (hh < 10) {
    time += '0'
    time += hh + ':'
    hh = '0' + hh
  } else {
    time += hh + ':'
    hh = hh
  }
  if (mm < 10) {
    time += '0'
    time += mm + ':'
    mm = '0' + mm
  } else {
    time += mm + ':'
    mm = mm
  }
  if (ss < 10) {
    time += '0' + ss
    ss = '0' + ss
  } else {
    time += ss
    ss = ss
  }
  return { time, YYYYMMDD, year, month, day, hh, mm, ss }
}

// 判断是否过期
const isExpired = (playTime) => {
  // let playTimestamp = new Date(playTime.replace(/-/g, '/').valueOf()) + (48 * 60 * 60 * 1000) // 两天后
  let playTimestamp = parseInt(playTime) + (48 * 60 * 60 * 1000) // 两天后
  // let playTimestamp = parseInt(playTime) + 10 * 1000 // 两天后
  let currentTimestamp = new Date().getTime()
  return currentTimestamp > playTimestamp // 为true就是过期
}

// 计算剩余时间
const isTimeLeft = (endTime) => {
  let currentTimestamp = new Date().getTime() // 现在时间的时间戳
  let endTimeTimestamp = new Date(endTime.replace(/-/g, '/').valueOf()) // 结束时间的时间戳
  let countDown = endTimeTimestamp - currentTimestamp
  if (countDown <= 0) {
    // alert('设置时间不能小于当前时间哦~~~')
    return { day: '00', hh: '00', mm: '00', ss: '00' }
  }
  let day = parseInt(countDown / 1000 / 60 / 60 / 24) // 倒计时多少天
  day = day < 10 ? '0' + day : day // 三元运算符判断天数是否小于10，小于的话在前边加个0（为了看起来不别扭）
  let hh = parseInt(countDown / 1000 / 60 / 60 % 24) // 倒计时多少小时
  hh = hh < 10 ? '0' + hh : hh
  let mm = parseInt(countDown / 1000 / 60 % 60) // 倒计时多少分钟
  mm = mm < 10 ? '0' + mm : mm
  let ss = parseInt(countDown / 1000 % 60) // 倒计时多少秒
  ss = ss < 10 ? '0' + ss : ss
  return { day, hh, mm, ss }
}

export { formatDate, isExpired, isTimeLeft }
