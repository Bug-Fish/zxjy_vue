import request from '@/utils/request'

// export function getList(params) {
//     return request({
//         url: '/table/list',
//         method: 'get',
//         params
//     })
// }
export default {
  createStaData(day) {
    return request({
      url: `/staservice/statistics-daily/registerCount/${day}`,
      method: 'post'
    })
  },
  showData(searchObj) {
    return request({
      url: `/staservice/statistics-daily/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'post'
    })
  }
}
