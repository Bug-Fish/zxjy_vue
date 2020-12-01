import request from '@/utils/request'
export default {
  register(registerVo) {
    return request({
      url: `/eduucenter/member/register`,
      method: 'post',
      data: registerVo
    })
  },
  sendMsm(phone) {
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  }
}