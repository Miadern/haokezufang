import axios from 'axios'

const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
