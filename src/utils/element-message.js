// element提示msg 弹出信息格式
// _elementMsg('msg', 'success')
// _elementMsg('msg', 'warning')
// _elementMsg('msg', 'error')
import { Message } from 'element-ui'

const _elementMsg = (msg = '信息', type = 'success') => {
  Message({
    type: type,
    message: msg,
    showClose: true,
    center: true,
  })
}

export { _elementMsg }
