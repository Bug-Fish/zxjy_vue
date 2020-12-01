import request from '@/utils/request'
export default {
  pageAllTeacher(current, limit) {
    return request({
      url: `/eduservice/teacherfront/pageAllTeacher/${current}/${limit}`,
      method: 'post'
    })
  },
  getTeacherById(id) {
    return request({
      url: `/eduservice/teacherfront/getTeacherById/${id}`,
      method: 'get'
    })
  },
  
}