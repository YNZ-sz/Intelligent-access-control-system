// import Mock from 'mockjs'

// // 定义员工数据类型
// interface Employee {
//   id: number
//   name: string
//   gender: '男' | '女'
//   phone: string
//   email: string
//   deptId: number
//   deptName: string
//   status: 0 | 1
// }

// // 定义导入失败详情类型
// interface FailDetail {
//   rowNum: number
//   reason: string
// }

// // 定义导入结果类型
// interface ImportResult {
//   successCount: number
//   failCount: number
//   failDetails: FailDetail[]
// }

// // 定义响应数据类型
// interface ApiResponse<T> {
//   code: number
//   message: string
//   timestamp: number
//   data: T
// }

// // 生成 100 条假员工数据
// const mockEmployeeData: Employee[] = Mock.mock({
//   'list|100': [
//     {
//       'id|+1': 1000,
//       name: '@cname',
//       'gender|1': ['男', '女'],
//       phone: /^1[3-9]\d{9}$/,
//       email: '@email',
//       'deptId|1-5': 1,
//       deptName: Mock.Random.pick(['技术部', '人事部', '财务部', '市场部', '运营部']),
//       'status|1': [0, 1],
//     },
//   ],
// }).list

// // 模拟 Token 存储（需和之前的认证逻辑保持一致）
// const tokenStore = new Map<string, { user: { role: string } }>()

// // 从请求头提取 Token 的工具函数
// const getTokenFromHeader = (headers: Record<string, string>): string | null => {
//   const authHeader = headers.authorization || headers.Authorization
//   return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader || null
// }

// export default [
//   // 批量导入员工接口
//   {
//     url: '/admin/employees/batch-import',
//     method: 'post',
//     response: (options: { headers: Record<string, string>; body: string }) => {
//       // 步骤1：提取并校验 Token
//       const token = getTokenFromHeader(options.headers)
//       if (!token) {
//         return {
//           code: 401,
//           message: '未授权：请先登录',
//           timestamp: Date.now(),
//         } as ApiResponse<null>
//       }

//       // 步骤2：校验用户角色（仅 super_admin 可访问）
//       const tokenInfo = tokenStore.get(token)
//       if (!tokenInfo) {
//         return {
//           code: 403,
//           message: '无权限访问此接口',
//           timestamp: Date.now(),
//         } as ApiResponse<null>
//       }

//       // 步骤3：模拟导入逻辑
//       let successCount = 0
//       let failCount = 0
//       const failDetails: FailDetail[] = []

//       mockEmployeeData.forEach((item: Employee, index: number) => {
//         const isFail = Mock.Random.boolean() // 50% 概率失败，如需自定义概率需传两个参数
//         if (isFail) {
//           failCount++
//           failDetails.push({
//             rowNum: index + 1,
//             reason: Mock.Random.pick(['手机号格式错误', '邮箱格式错误', '部门不存在', '姓名为空']),
//           })
//         } else {
//           successCount++
//         }
//       })
//       console.log('成功计数：', successCount)
//       console.log('失败计数：', failCount)
//       console.log('失败细节', failDetails)

//       // 步骤4：返回导入结果
//       return {
//         code: 200,
//         message: '操作成功',
//         timestamp: Date.now(),
//         data: {
//           successCount,
//           failCount,
//           failDetails,
//         },
//       } as ApiResponse<ImportResult>
//     },
//   },

//   // 获取模拟员工数据接口
//   {
//     url: '/admin/employees/mock-data',
//     method: 'get',
//     response: () => {
//       return {
//         code: 200,
//         message: '操作成功',
//         timestamp: Date.now(),
//         data: mockEmployeeData,
//       } as ApiResponse<Employee[]>
//     },
//   },
// ]
