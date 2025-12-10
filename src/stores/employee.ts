import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { employee_add, employee_get, employee_get_text } from '@/api/employee' // 导入接口
import type { Employee_add } from '@/api/employee' // 导入接口
//----------------------------------------------------------------------------------------------------------------
import type { Employee } from '@/mock/user'
interface EmployeeState {
  list: Employee[] // 员工列表数据
  pageNum: number // 当前页码
  pageSize: number // 每页条数
  total: number // 总数据量
  isLoading: boolean // 加载中状态
  hasMore: boolean // 是否还有更多数据
}
//----------------------------------------------------------------------------------------------------------------

// 定义用户信息类型（TS 类型约束）
export interface UserInfo {
  id: number
  username: string
  role: string
  // 其他字段按后端返回补充
}

export const useEmployeeStore = defineStore('employee', () => {
  const employeeData: any = ref<any>()
  const EmployeeState = reactive<EmployeeState>({
    list: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    isLoading: false,
    hasMore: true,
  })

  const add_employee = async (employee_data: Employee_add) => {
    let employeereport: any = null
    try {
      employeereport = await employee_add(employee_data)
      if (employeereport.code !== 200) {
        throw new Error(employeereport.message)
      }
    } catch (err) {
      console.log('(pinia)添加员工失败，错误原因：' + err)
      alert('(pinia)添加员工失败')
      return null
    }
    console.log('(pinia)成功')
  }

  const get_employee = async () => {
    let employeereport: any = null
    try {
      employeereport = await employee_get()
      if (employeereport.code !== 200) {
        throw new Error(employeereport.message)
      }
    } catch (err) {
      console.log('(pinia)获取员工列表失败，错误原因：' + err)
      alert('(pinia)获取员工列表失败')
      return null
    }

    employeeData.value = employeereport.data
    console.log('(pinia)成功')
  }

  const get_employee_gun = async () => {
    let employee_gun_report: any = null
    try {
      employee_gun_report = await employee_get_text()
      if (employee_gun_report.code !== 200) {
        throw new Error(employee_gun_report.message)
      }
    } catch (err) {
      console.log('(pinia)获取员工列表失败，错误原因：' + err)
      alert('(pinia)获取员工列表失败')
      return null
    }

    employeeData.value = employee_gun_report.data || [] // 防止 data 为 undefined 时赋值失败
    console.log('(pinia)成功', employeeData.value)
  }
  const fetchEmployees = async () => {
    if (EmployeeState.isLoading || !EmployeeState.hasMore) return

    EmployeeState.isLoading = true
    try {
      // const response = await axios.get<{
      //   code: number
      //   message: string
      //   data: {
      //     list: Employee[]
      //     total: number
      //   }
      // }>('/api/employees', {
      //   params: {
      //     pageNum: EmployeeState.pageNum,
      //     pageSize: EmployeeState.pageSize,
      //   },
      // })
      const response: any = await employee_get_text()

      if (response.code === 200) {
        const { list, total } = response.data
        // 第一页直接替换，后续页面追加
        EmployeeState.list = EmployeeState.pageNum === 1 ? list : [...EmployeeState.list, ...list]
        EmployeeState.total = total
        // 判断是否还有更多数据
        EmployeeState.hasMore = EmployeeState.list.length < total
        // 页码自增
        EmployeeState.pageNum++
        console.log('(pinia)加载员工数据成功：', EmployeeState)
      }
    } catch (error) {
      console.error('(pinia)加载员工数据失败：', error)
    } finally {
      EmployeeState.isLoading = false
    }
  }
  return {
    add_employee,
    get_employee,
    get_employee_gun,
    employeeData,
    fetchEmployees,
    EmployeeState,
  }
})
