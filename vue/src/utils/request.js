import router from '@/router';
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000
})

request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  // const user = JSON.parse(localStorage.getItem('xm-user') || '{}')
  // config.headers['token'] = user.token || ''
  return config
}, error => {
  return Promise.reject(error)
})


request.interceptors.response.use(response => {
  let res = response.data
  if (response.config.responseType === 'blob') {
    return res
  } 
  if (typeof res === 'string') {
    res = res ? JSON.parse(res) : res
  }
  if (res.code === 401) {
    router.push({ name: 'login' })
  }
  return res;
}, error => {
  if (error.response.status === 401) {
    ElMessage.error('未找到请求接口')
  }else if (error.response.status === 500) {
    ElMessage.error('服务器错误')
  }else {
    console.log(error.message)
  }
  return Promise.reject(error)
})

export default request
