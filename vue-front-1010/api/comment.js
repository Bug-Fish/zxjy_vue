import request from '@/utils/request'
export default {
  getAllComment(current, limit) {
    return request({
      url: `/eduservice/edu-comment/getAllComment/${current}/${limit}`,
      method: 'get'
    })
  }
}