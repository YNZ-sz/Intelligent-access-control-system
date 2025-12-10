// stores/attendance.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAttendanceInfo, addAttendanceInfoApi, type addRuleItem } from '@/api/attendance' // 导入接口
import { ElMessage } from 'element-plus'

interface RuleItem {
  ruleId: number
  ruleName: string
  workStartTime: string
  workEndTime: string
  lateThreshold: number
  earlyLeaveThreshold: number
  isEnabled: number
}

export const useAttendanceStore = defineStore('attendance', () => {
  // 状态
  const ruleList = ref<RuleItem[]>([])
  const loading = ref(false)
  const hasMore = ref(true)
  const page = ref(1)
  const pageSize = ref(10)

  // 计算属性（可选）
  const enabledRuleCount = computed(() => ruleList.value.filter((item) => item.isEnabled).length)

  // 方法：获取规则列表
  const fetchRuleList = async (isLoadMore = false) => {
    if (loading.value || !hasMore.value) return

    loading.value = true
    try {
      const res: any = await getAttendanceInfo()

      if (res.code !== 200) {
        throw new Error(res.msg)
      }
      console.log(res)
      const data = res.data
      if (isLoadMore) {
        ruleList.value.push(...data)
        page.value += 1
      } else {
        ruleList.value = data
        page.value = 1
      }
      // hasMore.value = data.length === pageSize.value
    } catch (err) {
      console.error('获取规则失败:', err)
    } finally {
      loading.value = false
    }
  }
  // 方法：添加规则列表
  const addAttendanceInfo = async (data: addRuleItem) => {
    console.log('1235vv')

    try {
      const res: any = await addAttendanceInfoApi(data)

      if (res.code !== 200) {
        throw new Error(res.msg)
      }
      ElMessage.success({
        message: '规则添加成功！',
        type: 'success',
        duration: 2000, // 2秒后自动关闭
        showClose: true, // 允许手动关闭
        icon: 'el-icon-circle-check', // 自定义成功图标
      })
    } catch (err) {
      console.error('添加规则失败:', err)
    } finally {
    }
  }

  const resetList = () => {
    ruleList.value = []
    hasMore.value = true
    page.value = 1
  }

  return {
    ruleList,
    loading,
    hasMore,
    enabledRuleCount,
    fetchRuleList,
    resetList,
    addAttendanceInfo,
  }
})
