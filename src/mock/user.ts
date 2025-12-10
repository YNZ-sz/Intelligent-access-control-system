// // src/mock/employee.ts
// import Mock from 'mockjs'
// // 固定 10 个测试用户（账号+密码+对应信息，可按需修改）
// const mockUsers = [
//   {
//     username: 'admin',
//     password: '123456',
//     id: 1001,
//     role: 'admin',
//     permissions: ['POST:/admin/employees', 'GET:/admin/roles', 'PUT:/admin/user'],
//     extra: { deptId: 1, deptName: '技术部' },
//   },
//   {
//     username: 'user01',
//     password: 'user01@123',
//     id: 1002,
//     role: 'user',
//     permissions: ['GET:/admin/employees'],
//     extra: { deptId: 2, deptName: '人事部' },
//   },
//   {
//     username: 'user02',
//     password: 'user02@123',
//     id: 1003,
//     role: 'user',
//     permissions: ['GET:/admin/employees'],
//     extra: { deptId: 3, deptName: '财务部' },
//   },
//   {
//     username: 'editor01',
//     password: 'editor01@123',
//     id: 1004,
//     role: 'editor',
//     permissions: ['POST:/admin/employees', 'PUT:/admin/employees'],
//     extra: { deptId: 1, deptName: '技术部' },
//   },
//   {
//     username: 'editor02',
//     password: 'editor02@123',
//     id: 1005,
//     role: 'editor',
//     permissions: ['POST:/admin/employees', 'PUT:/admin/employees'],
//     extra: { deptId: 4, deptName: '市场部' },
//   },
//   {
//     username: 'test01',
//     password: 'test01@123',
//     id: 1006,
//     role: 'user',
//     permissions: ['GET:/admin/employees'],
//     extra: { deptId: 5, deptName: '运营部' },
//   },
//   {
//     username: 'test02',
//     password: 'test02@123',
//     id: 1007,
//     role: 'user',
//     permissions: ['GET:/admin/employees'],
//     extra: { deptId: 2, deptName: '人事部' },
//   },
//   {
//     username: 'manager01',
//     password: 'manager01@123',
//     id: 1008,
//     role: 'manager',
//     permissions: ['POST:/admin/employees', 'GET:/admin/roles', 'DELETE:/admin/employees'],
//     extra: { deptId: 1, deptName: '技术部' },
//   },
//   {
//     username: 'manager02',
//     password: 'manager02@123',
//     id: 1009,
//     role: 'manager',
//     permissions: ['POST:/admin/employees', 'GET:/admin/roles', 'DELETE:/admin/employees'],
//     extra: { deptId: 4, deptName: '市场部' },
//   },
//   {
//     username: 'guest',
//     password: 'guest123',
//     id: 1010,
//     role: 'guest',
//     permissions: [],
//     extra: { deptId: 6, deptName: '访客部' },
//   },
// ]

// // 模拟员工列表接口（路径和真实接口一致：/admin/employees）
// export default [
//   {
//     url: '/auth/salt',
//     method: 'get',
//     response: (options: any) => {
//       // 原代码（从 body 拿值，现在不用了）
//       // let username = options.body;
//       console.log('salt 类型：', typeof options)
//       console.log('salt 原值：', options)
//       // 改后代码（从 URL 参数拿值，核心修改）
//       const { username } = options.query // ✅ 直接解构 URL 中的 username

//       // 参数校验（逻辑不变）
//       if (!username) {
//         return {
//           code: 1007,
//           message: '参数错误：username 不能为空',
//           timestamp: Date.now(),
//         }
//       }

//       // 返回 mock 数据（逻辑不变）
//       return {
//         code: 200,
//         message: '操作成功',
//         timestamp: Date.now(),
//         data: {
//           salt: Mock.Random.string(16), // 16位随机盐值
//           expireTime: Date.now() + 10 * 60 * 1000, // 10分钟过期
//         },
//       }
//     },
//   },

//   {
//     url: '/auth/login',
//     method: 'post',
//     response: (options: any) => {
//       // const { username, password, phone, code } = JSON.parse(options.body)
//       console.log('body 类型：', typeof options.body)
//       console.log('body 原值：', options.body)
//       let params: any = {}
//       // 兼容处理：如果是字符串则解析，否则直接使用对象
//       if (typeof options.body === 'string') {
//         params = JSON.parse(options.body)
//       } else {
//         params = options.body
//       }
//       const { username, password, phone, code } = params

//       // 基础参数校验
//       if (!username || !password || !phone || !code) {
//         return {
//           code: 1007,
//           message: '参数错误：用户名、密码、手机号、验证码不能为空',
//           timestamp: Date.now(),
//         }
//       }
//       if (code !== '666666') {
//         return {
//           code: 1008,
//           message: '验证码错误',
//           timestamp: Date.now(),
//         }
//       }
//       if (!/^1[3-9]\d{9}$/.test(phone)) {
//         return {
//           code: 1009,
//           message: '手机号格式错误',
//           timestamp: Date.now(),
//         }
//       }
//       if (password.length < 6) {
//         return {
//           code: 1010,
//           message: '密码长度不能少于 6 位',
//           timestamp: Date.now(),
//         }
//       }

//       const matchedUser = mockUsers.find(
//         (user) => user.username === username && user.password === password,
//       )
//       if (!matchedUser) {
//         return { code: 1011, message: '用户名或密码错误', timestamp: Date.now() }
//       }

//       const res = {
//         code: 200,
//         message: '操作成功',
//         timestamp: Date.now(),
//         data: {
//           token: Mock.Random.string('alphaNumeric', 64), // JWT 格式长 Token
//           refreshToken: Mock.Random.string('alphaNumeric', 80), // 刷新 Token
//           id: matchedUser.id,
//           role: matchedUser.role,
//           permissions: matchedUser.permissions,
//           expireTime: Date.now() + 4 * 60 * 60 * 1000, // Token 4小时过期
//           extra: matchedUser.extra,
//         },
//       }
//       console.log('登录成功返回数据：', res)
//       // 匹配目标返回格式
//       return res
//     },
//   },
// ]

import Mock from 'mockjs'

// 定义员工数据类型
export interface Employee {
  id: string
  name: string
  department: string
  position: string
  phone: string
  email: string
  hireDate: string
  status: '在职' | '离职' | '休假'
}
interface PageParams {
  pageNum: number // 页码（从1开始）
  pageSize: number // 每页条数
}
// 定义分页结果类型
interface PageResult<T> {
  total: number
  pageNum: number
  pageSize: number
  list: T[]
}

// 定义响应数据类型
interface ApiResponse<T> {
  code: number
  message: string
  timestamp: number
  data: T
}

// 生成 100 条假员工数据
const mockEmployeeList: Employee[] = Mock.mock({
  'list|100': [
    {
      'id|+1': 1, // 自增ID
      name: '@cname', // 中文姓名
      department: '@pick(["技术部", "产品部", "运营部", "人事部", "财务部"])', // 随机部门
      position: '@pick(["前端开发", "后端开发", "产品经理", "运营专员", "HR", "会计"])', // 随机职位
      phone: /^1[3-9]\d{9}$/, // 手机号
      email: '@email', // 邮箱
      hireDate: '@date("yyyy-MM-dd")', // 入职日期
      status: '@pick(["在职", "离职", "休假"])', // 状态
    },
  ],
}).list as Employee[]
//----------------------------------------------------------------------------

const tokenvalid = (options: any) => {
  const token = getTokenFromHeader(options.headers)
  console.log('token: ' + token)
  if (!token) {
    return { code: 403, message: '未授权：请先登录', timestamp: Date.now() }
  }

  // 校验 Token 是否存在
  const tokenInfo = tokenStore.get(token)
  if (!tokenInfo) {
    return { code: 403, message: '无效 Token：请重新登录', timestamp: Date.now() }
  }

  // 校验 Token 是否过期
  if (Date.now() > tokenInfo.expireTime) {
    tokenStore.delete(token) // 删除过期 Token
    return { code: 401, message: 'Token 已过期：请重新登录', timestamp: Date.now() }
  }

  return tokenInfo
}

// 1. 固定 10 个测试用户（原始数据）
const mockUsers = [
  {
    username: 'admin',
    password: '123456',
    id: 1001,
    role: 'manager',
    permissions: ['POST:/admin/employees', 'GET:/admin/roles', 'PUT:/admin/user'],
    extra: { deptId: 1, deptName: '技术部' },
  },
  {
    username: 'user01',
    password: 'user01@123',
    id: 1002,
    role: 'user',
    permissions: ['GET:/admin/employees'],
    extra: { deptId: 2, deptName: '人事部' },
  },
  {
    username: 'user02',
    password: 'user02@123',
    id: 1003,
    role: 'user',
    permissions: ['GET:/admin/employees'],
    extra: { deptId: 3, deptName: '财务部' },
  },
  {
    username: 'editor01',
    password: 'editor01@123',
    id: 1004,
    role: 'editor',
    permissions: ['POST:/admin/employees', 'PUT:/admin/employees'],
    extra: { deptId: 1, deptName: '技术部' },
  },
  {
    username: 'editor02',
    password: 'editor02@123',
    id: 1005,
    role: 'editor',
    permissions: ['POST:/admin/employees', 'PUT:/admin/employees'],
    extra: { deptId: 4, deptName: '市场部' },
  },
  {
    username: 'test01',
    password: 'test01@123',
    id: 1006,
    role: 'user',
    permissions: ['GET:/admin/employees'],
    extra: { deptId: 5, deptName: '运营部' },
  },
  {
    username: 'test02',
    password: 'test02@123',
    id: 1007,
    role: 'user',
    permissions: ['GET:/admin/employees'],
    extra: { deptId: 2, deptName: '人事部' },
  },
  {
    username: 'manager01',
    password: 'manager01@123',
    id: 1008,
    role: 'manager',
    permissions: ['POST:/admin/employees', 'GET:/admin/roles', 'DELETE:/admin/employees'],
    extra: { deptId: 1, deptName: '技术部' },
  },
  {
    username: 'manager02',
    password: 'manager02@123',
    id: 1009,
    role: 'manager',
    permissions: ['POST:/admin/employees', 'GET:/admin/roles', 'DELETE:/admin/employees'],
    extra: { deptId: 4, deptName: '市场部' },
  },
  {
    username: 'guest',
    password: 'guest123',
    id: 1010,
    role: 'guest',
    permissions: [],
    extra: { deptId: 6, deptName: '访客部' },
  },
]

// 2. Mock Token 存储（模拟后端数据库）：key=token，value={用户信息, 过期时间}
const tokenStore = new Map<string, { user: (typeof mockUsers)[0]; expireTime: number }>()

// 3. 工具函数：从请求头提取 Token
const getTokenFromHeader = (headers: any) => {
  // 适配常见的 Token 传递格式（Bearer Token 或直接传 Token）
  const authHeader = headers.authorization || headers.Authorization
  if (!authHeader) return null
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
}

export default [
  // 1. 盐值接口（保留）
  {
    url: '/auth/salt',
    method: 'get',
    response: (options: any) => {
      const { username } = options.query
      if (!username || username.trim() === '') {
        return { code: 1007, message: '参数错误：username 不能为空', timestamp: Date.now() }
      }
      return {
        code: 200,
        message: '操作成功',
        timestamp: Date.now(),
        data: { salt: Mock.Random.string(16), expireTime: Date.now() + 10 * 60 * 1000 },
      }
    },
  },

  // 2. 登录接口：生成 Token 并存储
  {
    url: '/auth/login',
    method: 'post',
    response: (options: any) => {
      const params = options.body
      const { username, password } = params

      // 校验账号密码
      if (!username || !password) {
        return { code: 1007, message: '用户名或密码不能为空', timestamp: Date.now() }
      }
      const matchedUser = mockUsers.find((u) => u.username === username && u.password === password)
      if (!matchedUser) {
        return { code: 1011, message: '用户名或密码错误', timestamp: Date.now() }
      }

      // 生成 Token 和过期时间（4小时）
      const token = Mock.Random.string('alphaNumeric', 64) // 唯一 Token
      const refreshToken = Mock.Random.string('alphaNumeric', 80)
      const expireTime = Date.now() + 4 * 60 * 60 * 1000

      // 存储 Token（关联用户信息和过期时间）
      tokenStore.set(token, { user: matchedUser, expireTime })
      // 可选：存储 refreshToken（用于刷新 Token，按需使用）
      tokenStore.set(refreshToken, {
        user: matchedUser,
        expireTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
      })

      // 返回结果（含 Token 和用户原始数据）
      return {
        code: 200,
        message: '操作成功',
        timestamp: Date.now(),
        data: {
          token,
          refreshToken,
          expireTime,
          id: matchedUser.id,
          role: matchedUser.role,
          permissions: matchedUser.permissions,
          extra: matchedUser.extra,
        },
      }
    },
  },

  // text1. 需 Token 认证的接口示例：获取用户信息（校验 Token 有效性）
  {
    url: '/auth/user/info',
    method: 'get',
    response: (options: any) => {
      // 从请求头提取 Token
      const tokenInfo: any = tokenvalid(options)
      // Token 有效：返回存储的用户原始数据
      const matchedUser = tokenInfo.user
      return {
        code: 200,
        message: 'text测试操作成功',
        timestamp: Date.now(),
        data: {
          id: matchedUser.id,
          username: matchedUser.username,
          role: matchedUser.role,
          permissions: matchedUser.permissions,
          extra: matchedUser.extra,
          expireTime: tokenInfo.expireTime,
        },
      }
    },
  },

  // 3. 刷新 Token 接口：POST /auth/refresh
  {
    url: '/auth/refresh',
    method: 'post',
    response: (options: any) => {
      // 解析请求体中的 refreshToken（兼容对象/字符串格式）
      const params = typeof options.body === 'string' ? JSON.parse(options.body) : options.body
      const { refreshToken } = params

      // 1. 校验 refreshToken 是否为空
      if (!refreshToken) {
        return {
          code: 400,
          message: '参数错误：refreshToken 不能为空',
          timestamp: Date.now(),
        }
      }

      // 2. 校验 refreshToken 是否有效
      const refreshTokenInfo = tokenStore.get(refreshToken)
      if (!refreshTokenInfo) {
        return {
          code: 400,
          message: '令牌无效或已过期',
          timestamp: Date.now(),
        }
      }

      // 3. 校验 refreshToken 是否过期
      if (Date.now() > refreshTokenInfo.expireTime) {
        tokenStore.delete(refreshToken) // 删除过期的 refreshToken
        return {
          code: 400,
          message: '令牌无效或已过期',
          timestamp: Date.now(),
        }
      }

      // 4. 生成新 Token 和 refreshToken（模拟刷新逻辑）
      const newToken = Mock.Random.string('alphaNumeric', 64)
      const newRefreshToken = Mock.Random.string('alphaNumeric', 80)
      const newExpireTime = Date.now() + 4 * 60 * 60 * 1000 // 新 Token 4小时过期
      const newRefreshExpireTime = Date.now() + 7 * 24 * 60 * 60 * 1000 // 新 refreshToken 7天过期

      // 5. 存储新 Token 和 refreshToken
      tokenStore.set(newToken, { user: refreshTokenInfo.user, expireTime: newExpireTime })
      tokenStore.set(newRefreshToken, {
        user: refreshTokenInfo.user,
        expireTime: newRefreshExpireTime,
      })
      tokenStore.delete(refreshToken) // 删除过期的 refreshToken

      // 6. 返回匹配用户的原始数据 + 新 Token 信息（完全匹配接口文档格式）
      return {
        code: 200,
        message: '操作成功',
        timestamp: Date.now(),
        data: {
          token: newToken,
          refreshToken: newRefreshToken,
          id: refreshTokenInfo.user.id,
          role: refreshTokenInfo.user.role,
          permissions: refreshTokenInfo.user.permissions,
          expireTime: newExpireTime,
          extra: refreshTokenInfo.user.extra,
        },
      }
    },
  },
  // // 5. 退出登录接口：删除 Token（模拟登出）
  // {
  //   url: '/auth/logout',
  //   method: 'post',
  //   response: (options: any) => {
  //     const token = getTokenFromHeader(options.headers)
  //     if (token) {
  //       tokenStore.delete(token) // 移除 Token，使其失效
  //     }
  //     return { code: 200, message: '退出成功', timestamp: Date.now() }
  //   },
  // },

  // 4. 获取员工列表信息
  {
    url: '/admin/employees/batch-import',
    method: 'get',

    response: (options: { headers: Record<string, string>; query: PageParams }) => {
      // 从 query 中获取分页参数，默认 pageNum=1，pageSize=10
      const pageNum = Number(options.query.pageNum) || 1
      const pageSize = Number(options.query.pageSize) || 10

      // 计算截取数据的起始和结束索引
      const startIndex = (pageNum - 1) * pageSize
      const endIndex = startIndex + pageSize
      const data = mockEmployeeList.slice(startIndex, endIndex)

      // 返回模拟响应数据（和真实接口格式一致）
      return {
        code: 200,
        message: 'success',
        data: {
          list: data,
          total: mockEmployeeList.length, // 总数据量
          pageNum,
          pageSize,
        },
      }
    },
  },
]
