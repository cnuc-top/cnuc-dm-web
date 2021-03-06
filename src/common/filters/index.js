import moment from 'moment'

export function timeFormat(value, src, format) {
  let val = moment(value, src).format(format)
  if (format === 'd') {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    val = week[val]
  }
  return val
}

export function dateTime(value) {
  return moment(value).format('YYYY年MM月DD日 H:mm:ss')
}
