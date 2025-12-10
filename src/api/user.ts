// src/api/user.ts
import request from '@/utils/request'
import type { ApiResponse } from '@/utils/request'

// 定义登录请求参数类型（和后端 JSON 字段完全一致）
interface LoginResponseData {
  accessToken: string
  refreshToken: string
  userId: number
  username: string // 明确有 username 属性
  role: string
}

// 登录接口（参数和后端 JSON 匹配）
export const login = (loginUsername: string, password: string) => {
  console.log(loginUsername, ' ', password)
  return request({
    url: '/auth/login',
    method: 'POST',
    data: { username: loginUsername, password },
  })
}

export const getSalt = (username: string) => {
  return request({
    url: '/auth/salt',
    method: 'get',
    params: { username }, // ✅ GET 用 params，参数会拼到 URL 上
  })
}

export const tktext = (data: string) => {
  return request({
    url: '/auth/user/info',
    method: 'get',
    params: { data }, // ✅ GET 用 params，参数会拼到 URL 上
  })
}

export const getcode = (phone: string) => {
  return request({
    url: '/common/verify-code',
    method: 'POST',
    data: { phone, scene: 'register' },
  })
}

export const phoneregist = (
  username: string,
  password: string,
  phone: string,
  verifyCode: string,
) => {
  return request({
    url: '/auth/register',
    method: 'POST',
    data: { username, password, phone, verifyCode },
  })
}
export const getuserinfo = () => {
  return request({
    url: '/user/info',
    method: 'get',
  })
}
