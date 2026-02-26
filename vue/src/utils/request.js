import router from '@/router';
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000
})

request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  let user = JSON.parse(localStorage.getItem('xm-user') || '{}') // 登录后 后端将token一同添加到用户信息中返回
  config.headers['token'] = user.token || ''
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
    try {
      // 只有非空字符串才尝试解析，空字符串直接返回
      res = res ? JSON.parse(res) : res
    } catch (e) {
      // 解析失败时提示并抛出错误，避免后续逻辑出错
      ElMessage.error('接口返回数据格式错误，非合法JSON')
      return Promise.reject(new Error('JSON 解析失败: ' + res))
    }
  }
  if (res.code === '401') {
    ElMessage.error(res.msg)
    router.push('/login')
  }
  return res;
}, error => {
  if (error.response.status === 404) {
    ElMessage.error('未找到请求接口')
  }else if (error.response.status === 500) {
    ElMessage.error('服务器错误')
  }else {
    console.log(error.message)
  }
  return Promise.reject(error)
})

export default request
