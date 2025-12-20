import request from '@/utils/request'
import type { ApiResponse } from '@/utils/request'

export interface addRuleItem {
  ruleName: string
  workStartTime: string
  workEndTime: string
  lateThreshold: number
  earlyLeaveThreshold: number
}

export const getAttendanceInfo = (pageNum = 1, pageSize = 10) => {
  return request({
    url: '/admin/attendance/rule',
    method: 'get',
    params: {
      pageNum, // 类型 number + 默认值 1
      pageSize, // 类型 number + 默认值 10
    },
  })
}
export const addAttendanceInfoApi = (data: addRuleItem) => {
  // 临时添加
  const submitData = {
    ...data,
    ruleId: Date.now() + Math.floor(Math.random() * 1000), // 或generateUUID()
  }
  console.log(submitData)

  return request({
    url: '/admin/attendance/rule',
    method: 'POST',
    data: submitData,
  })
}
