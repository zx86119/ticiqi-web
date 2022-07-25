// 当前时间转为时间戳：
let currentTimestamp = new Date().getTime()

// 当前时间日期对象
let curDate = new Date(currentTimestamp)

// 参数时间戳转换成的日期对象
// let paramData = new Date(paramTimestamp)

/**
 * @param timestamp 时间戳
 * 调用：timestampToTime(1536630595068) 2018-09-11 9:49:55
 */

const getTimestampConversion = function(timestamp) {
  let timeStamp
  let timeStampLen = timestamp.toString().length
  if (timeStampLen === 10) {
    timeStamp = timestamp * 1000
  }
  else if (timeStampLen === 13) {
    timeStamp = timestamp
  }
  else {
    timeStamp = timestamp
  }
  let date = new Date(timeStamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + '日' + ' '
  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}

const formatData = () => {
  let time, YYYYMMDDnorm, YYYYMMDD, YYYY, MM, MMChinese, DD, HHMMSS
  let now = new Date()
  let year = now.getFullYear() //年
  let month = now.getMonth() + 1 //月
  let day = now.getDate() //日
  let hh = now.getHours() //时
  let mm = now.getMinutes() //分
  let ss = now.getSeconds() //秒

  time = year + '-'
  YYYYMMDDnorm = year + '-'
  HHMMSS = ''
  MMChinese = ''
  YYYY = year
  if (month < 10) {
    time += '0'
    time += month + '-'
    YYYYMMDDnorm += '0'
    YYYYMMDDnorm += month + '-'
    MM = '0' + month
  }
  else {
    time += month + '-'
    YYYYMMDDnorm += month + '-'
    MM = month
  }
  if (day < 10) {
    time += '0'
    time += day + ' '
    YYYYMMDDnorm += '0'
    YYYYMMDDnorm += day
    DD = '0' + day
  }
  else {
    time += day + ' '
    YYYYMMDDnorm += day
    DD = day
  }
  if (hh < 10) {
    time += '0'
    time += hh + ':'
    HHMMSS += '0'
    HHMMSS += hh + ':'
  }
  else {
    time += hh + ':'
    HHMMSS += hh + ':'
  }
  if (mm < 10) {
    time += '0'
    time += mm + ':'
    HHMMSS += '0'
    HHMMSS += mm + ':'
  }
  else {
    time += mm + ':'
    HHMMSS += mm + ':'
  }
  if (ss < 10) {
    time += '0'
    time += ss
    HHMMSS += '0'
    HHMMSS += ss
  }
  else {
    time += ss
    HHMMSS += ss
  }
  switch (MM) {
    case '01':
      MMChinese = '一月'
      break
    case '02':
      MMChinese = '二月'
      break
    case '03':
      MMChinese = '三月'
      break
    case '04':
      MMChinese = '四月'
      break
    case '05':
      MMChinese = '五月'
      break
    case '06':
      MMChinese = '六月'
      break
    case '07':
      MMChinese = '七月'
      break
    case '08':
      MMChinese = '八月'
      break
    case '09':
      MMChinese = '九月'
      break
    case '10':
      MMChinese = '十月'
      break
    case '11':
      MMChinese = '十一'
      break
    case '12':
      MMChinese = '十二'
      break
    default:
      MMChinese = ''
  }

  YYYYMMDD = YYYYMMDDnorm.split('-').join('')
  return { time, YYYYMMDDnorm, YYYYMMDD, YYYY, MM, MMChinese, DD, HHMMSS }
}

// 传入时间格式化
const formatDataTime = (time) => {
  var timeF = new Date(time.replace(/-/g, '/').valueOf())
  let now = new Date(timeF)
  let year = now.getFullYear() // 年
  let month = now.getMonth() + 1 // 月
  let day = now.getDate() // 日
  let hh = now.getHours() // 时
  let mm = now.getMinutes() // 分
  let ss = now.getSeconds() // 秒

  if (month < 10) {
    month = '0' + month
  }
  else {
    month = month
  }
  if (day < 10) {
    day = '0' + day
  }
  else {
    day = day
  }
  if (hh < 10) {
    hh += '0'
  }
  else {
    hh = hh
  }
  if (mm < 10) {
    mm += '0'
  }
  else {
    mm = mm
  }
  if (ss < 10) {
    ss += '0'
  }
  else {
    ss = ss
  }
  switch (month) {
    case '01':
      month = '一月'
      break
    case '02':
      month = '二月'
      break
    case '03':
      month = '三月'
      break
    case '04':
      month = '四月'
      break
    case '05':
      month = '五月'
      break
    case '06':
      month = '六月'
      break
    case '07':
      month = '七月'
      break
    case '08':
      month = '八月'
      break
    case '09':
      month = '九月'
      break
    case '10':
      month = '十月'
      break
    case '11':
      month = '十一'
      break
    case '12':
      month = '十二'
      break
    default:
      month = ''
  }

  return { year, month, day, hh, mm, ss }
}

export { currentTimestamp, curDate, getTimestampConversion, formatData, formatDataTime }
