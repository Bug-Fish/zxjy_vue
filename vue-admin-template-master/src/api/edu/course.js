import request from '@/utils/request'

// export function getList(params) {
//     return request({
//         url: '/table/list',
//         method: 'get',
//         params
//     })
// }
export default {
    pageCourseCondition(current, limit, courseQuery) {
        return request({
            url: `/eduservice/edu-course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data: courseQuery
        })
    },
    deleteCourseId(id) {
        return request({
            url: `/eduservice/edu-course/deleteCourse/${id}`,
            method: 'delete'
        })
    },
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/edu-course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    getCourseInfo(courseId) {
        return request({
            url: `/eduservice/edu-course/getCourseInfo/${courseId}`,
            method: 'get'
        })
    },
    getPublishCourseInfo(courseId) {
        return request({
            url: `/eduservice/edu-course/getPublishCourseInfo/${courseId}`,
            method: 'get'
        })
    },
    publishCourse(courseId) {
        return request({
            url: `/eduservice/edu-course/publishCourse/${courseId}`,
            method: 'post'
        })
    },


    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/edu-course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },


    // addCourseInfo(courseInfo) {
    //     return request({
    //         url: `/eduservice/edu-course/addCourseInfo`,
    //         method: 'post',
    //         data: courseInfo
    //     })
    // },




    getListTeacher(courseInfo) {
        return request({
            url: `/eduservice/edu-teacher/findAll`,
            method: 'get',
        })
    }
}