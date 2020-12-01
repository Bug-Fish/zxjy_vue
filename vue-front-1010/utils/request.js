import axios from 'axios'

import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8222', // api的base_url
  timeout: 20000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    //debugger
    if (cookie.get('zjy_token')) {
      config.headers['token'] = cookie.get('zjy_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)

service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
      window.location.href = "/login"
      return
    } else {
      if (response.data.code !== 20000) {
        if (response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000

          })
        }
      } else {
        return response
      }
    }
  },
  err => {
    return Promise.reject(err);
  }
)
export default service