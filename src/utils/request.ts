import axios from 'axios'
import { ElMessage } from 'element-plus' // 可选：UI 组件库的提示（需安装 element-plus）
import { useUserStore } from '@/stores/user'

// 若不用 UI 库，可替换为原生 alert 或自定义提示
// 定义后端响应的统一格式（根据实际后端返回调整）
export interface ApiResponse<T = any> {
  code: number // 状态码：200成功，其他失败
  msg: string // 提示信息
  data?: T // 响应数据（泛型适配不同接口）
}

// 1. 创建 Axios 实例
const service = axios.create({
  //  import.meta.env.VITE_API_BASE_URL, // 读取环境变量的基础地址
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000, // 请求超时时间（5秒）
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // 默认请求头
  },
})

// 2. 请求拦截器：发送请求前做处理（如加 Token）
service.interceptors.request.use(
  (config) => {
    // 从本地存储中获取 Token（登录成功后存储）
    const token = localStorage.getItem('token')
    if (token) {
      // 给请求头添加 Token（按后端要求的字段名，如 Authorization/Bearer Token）
      config.headers.Authorization = 'Bearer' + token
    }
    return config // 必须返回 config，否则请求会阻塞
  },
  (error) => {
    // 请求发送失败（如网络错误）
    console.log('request请求拦截器报错:' + error)
    return Promise.reject(error)
  },
)

// 2. 响应拦截器：捕获后端返回的 401 错误，触发刷新令牌
let isRefreshing = false // 防止同时触发多次刷新请求
let retryQueue: ((newToken: string) => void)[] = [] // 修正队列类型

// 3. 响应拦截器：接收响应后统一处理（成功/失败）
service.interceptors.response.use(
  (response) => {
    // 后端返回的响应数据（response.data 是核心）
    const res = response.data

    // 按后端约定的状态码判断（示例：200 成功，非 200 失败）
    if (res.code !== 200) {
      // 失败提示（如：账号密码错误、账号禁用等）
      ElMessage.error(res.msg || '请求失败')
      console.log('request响应拦截器报错，但后端连接接收成功，错误原因：' + res.msg)
      // 返回拒绝状态的 Promise，让接口调用处能捕获错误
      return Promise.reject(res)
    } else {
      // 成功：直接返回响应数据（简化接口调用处的取值）
      return res
    }
  },
  // (error) => {
  //   // 响应错误（如：404 接口不存在、500 后端报错、超时等）
  //   let errorMsg = '网络异常，请稍后再试'
  //   if (error.response) {
  //     // 有响应状态码：根据状态码自定义提示
  //     switch (error.response.status) {
  //       case 401:
  //         errorMsg = 'Token 失效，请重新登录'
  //         // 跳转到登录页（需引入路由）
  //         localStorage.removeItem('adminToken') // 清除无效 Token
  //         // window.location.href = '/login' // 强制跳转
  //         break
  //       case 403:
  //         errorMsg = '无权限访问'
  //         break
  //       case 404:
  //         errorMsg = '接口不存在'
  //         break
  //       case 500:
  //         errorMsg = '后端服务报错'
  //         break
  //       default:
  //         errorMsg = error.response.data?.message || errorMsg
  //     }
  //   } else if (error.request) {
  //     // 无响应（如：网络断开、超时）
  //     errorMsg = '请求超时，请检查网络'
  //   }

  //   // 提示错误信息
  //   ElMessage.error(errorMsg)
  //   // 返回拒绝状态的 Promise
  //   return Promise.reject(error)
  // },

  async (error) => {
    const originalRequest = error.config // 保存失败的原始请求
    let errorMsg = '网络异常（响应拦截器默认错误返回值）'

    // 条件：1. 错误状态码是 401；2. 不是刷新令牌本身的请求（避免死循环）；3. 没被重试过
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // 标记为已重试，避免重复触发

      if (!isRefreshing) {
        isRefreshing = true // 标记正在刷新令牌
        try {
          // 关键：调用 /auth/refresh 接口，传入存储的 refreshToken
          const refreshToken = localStorage.getItem('refreshToken')
          const refreshResponse = await service.post('/auth/refresh', { refreshToken })

          if (refreshResponse.data.code === 200) {
            // 刷新成功：获取新令牌并存储
            const newToken = refreshResponse.data.data.token
            const newRefreshToken = refreshResponse.data.data.refreshToken
            localStorage.setItem('token', newToken)
            localStorage.setItem('refreshToken', newRefreshToken)

            // 给等待重试的请求，更新新的 token 并重新发起
            retryQueue = [] // 清空队列

            // 给当前失败的请求，更新新的 token 并重新发起
            originalRequest.headers['Authorization'] = newToken
            return service(originalRequest) // 重试原始请求
          } else {
            // 刷新失败：refreshToken 也过期/无效，必须重新登录
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            window.location.href = '/login' // 跳转到登录页
            return Promise.reject('刷新令牌失败，请重新登录')
          }
        } catch (refreshError) {
          // 刷新接口本身失败（比如网络错误），也跳登录页
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false // 刷新完成，重置标记
        }
      }
      errorMsg = 'token过期'
      ElMessage.error(errorMsg)

      // 如果正在刷新令牌，把当前请求加入队列，等待刷新成功后重试
      return new Promise((resolve) => {
        retryQueue.push((newToken: string) => {
          originalRequest.headers['Authorization'] = newToken
          resolve(service(originalRequest))
        })
      })
    } else if (error.response) {
      // 有响应状态码：根据状态码自定义提示
      const userStore = useUserStore()

      switch (error.response.status) {
        case 403:
          errorMsg = '403无权限访问'
          break
        case 404:
          errorMsg = '404接口不存在'
          userStore.logout()
          break
        case 500:
          errorMsg = '500后端服务报错'
          break
        default:
          errorMsg = error.response.data?.message || errorMsg
      }
    } else if (error.request) {
      // 无响应（如：网络断开、超时）
      errorMsg = ' 无响应（如：网络断开、超时）'
    }
    //提示错误信息
    ElMessage.error('request响应拦截器报错：' + errorMsg)
    // 非 401 错误，直接返回错误
    console.log('request响应拦截器报错：' + errorMsg)
    console.log('request响应拦截器返回的error：' + error)

    return Promise.reject(error)
  },
)

// 导出封装后的 Axios 实例
// export default service
export { service }

// 2. 新的泛型请求函数作为默认导出（推荐，符合业务代码的导入习惯）
export default function request<T = any>(config: any): Promise<ApiResponse<T>> {
  return service(config) as Promise<ApiResponse<T>>
}
