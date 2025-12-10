import request from '@/utils/request'
import type { ApiResponse } from '@/utils/request'

export interface Employee_add {
  // id: string
  name: string
  phone: string
  // gender: '男' | '女'
  department: string
  position: string
  hireDate: string
}

// interface Employee_updata {
//   id: string
//   name: string
//   phone: string
//   // gender: '男' | '女'
//   department: string
//   position: string
//   hireDate: string
// }

//mock
export const employee_add = (data: Employee_add) => {
  return request({
    url: '/admin/employees',
    method: 'POST',
    data,
  })
}

//mock
export const employee_get = () => {
  return request({
    url: '/admin/employees',
    method: 'get',
  })
}
//mock
export const employee_get_text = () => {
  return request({
    url: '/admin/employees/batch-import',
    method: 'get',
    params: {
      pageNum: 1, // 类型 number + 默认值 1
      pageSize: 10, // 类型 number + 默认值 10
    },
  })
}
