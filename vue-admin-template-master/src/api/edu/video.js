import request from '@/utils/request'

// export function getList(params) {
//     return request({
//         url: '/table/list',
//         method: 'get',
//         params
//     })
// }
export default {
  deleteAliyunVideo(sourceId) {
    return request({
      url: `/eduvod/video/deleteAliyunVideo/${sourceId}`,
      method: 'delete'
    })
  },
  getAllVideo(courseId) {
    return request({
      url: `/eduservice/edu-video/getVideo/${courseId}`,
      method: 'get'
    })
  },
  addVideo(video) {
    return request({
      url: `/eduservice/edu-video/addVideo`,
      method: 'post',
      data: video
    })
  },
  deleteVideo(courseId) {
    return request({
      url: `/eduservice/edu-video/deleteVideo/${courseId}`,
      method: 'delete'
    })
  },
  updateVideo(video) {
    return request({
      url: `/eduservice/edu-video/updateVideo`,
      method: 'post',
      data: video
    })
  },

}