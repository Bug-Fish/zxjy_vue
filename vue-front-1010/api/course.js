import request from '@/utils/request'
export default {
  pageAllCourse(current, limit, courseFrontVo) {
    return request({
      url: `/eduservice/coursefront/pageAllCourse/${current}/${limit}`,
      method: 'post',
      data: courseFrontVo
    })
  },
  getAllSubject() {
    return request({
      url: `/eduservice/edu-subject/getAllSubject`,
      method: 'get'
    })
  },
  getCourseInfo(courseId) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
      method: 'get'
    })
  }
  
}