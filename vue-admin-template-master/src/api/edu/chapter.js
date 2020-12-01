import request from '@/utils/request'

// export function getList(params) {
//     return request({
//         url: '/table/list',
//         method: 'get',
//         params
//     })
// }
export default {
  getAllChapter(courseId) {
    return request({
      url: `/eduservice/edu-chapter/getChapter/${courseId}`,
      method: 'get'
    })
  },
  addChapter(eduChapter) {
    return request({
      url: `/eduservice/edu-chapter/addChapter`,
      method: 'post',
      data: eduChapter
    })
  },
  deleteChapter(courseId) {
    return request({
      url: `/eduservice/edu-chapter/deleteChapter/${courseId}`,
      method: 'delete'
    })
  },
  updateChapter(eduChapter) {
    return request({
      url: `/eduservice/edu-chapter/updateChapter`,
      method: 'post',
      data: eduChapter
    })
  },

}