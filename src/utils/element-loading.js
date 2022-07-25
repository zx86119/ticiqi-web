// ElementLoading(_self)
// ElementLoadingClose(_self)
const _elementLoading = (ele) => {
  ele.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.2)'
  })
}

const _elementLoadingClose = (ele) => {
  ele
    .$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })
    .close()
}

export { _elementLoading, _elementLoadingClose }
