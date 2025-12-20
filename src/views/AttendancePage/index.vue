<!-- views/AttendancePage.vue -->
<template>
  <!-- <div class= ' h-[calc(100vh)] overflow-auto' ref="listRef" > -->
  <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
    <!-- 顶部筛选栏 -->
    <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div class="flex flex-wrap gap-4 items-center">
        <el-input v-model="searchKeyword" placeholder="搜索规则名称" class="w-64" />
        <el-select v-model="statusFilter" placeholder="选择状态">
          <el-option label="全部" value="" />
          <el-option label="启用中" value="1" />
          <el-option label="已禁用" value="0" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="success" @click="handleAdd">新增规则</el-button>
      </div>
    </div>

    <!-- 规则列表（滚动加载） -->
    <h2 class="text-xl font-bold mb-4">考勤规则列表</h2>
    <!-- 数据统计卡片 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-gray-500 text-sm">总规则数</p>
        <p class="text-2xl font-bold">{{ attendanceStore.ruleList.length }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-gray-500 text-sm">启用规则数</p>
        <p class="text-2xl font-bold text-green-600">{{ attendanceStore.enabledRuleCount }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-gray-500 text-sm">禁用规则数</p>
        <p class="text-2xl font-bold text-orange-600">
          {{ attendanceStore.ruleList.length - attendanceStore.enabledRuleCount }}
        </p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <p class="text-gray-500 text-sm">今日新增</p>
        <p class="text-2xl font-bold text-blue-600">0</p>
      </div>
    </div>
    <!-- 规则项组件 -->
    <div>
      <AttendanceRuleItem
        v-for="rule in filteredRuleList"
        :key="rule.ruleId"
        :rule="rule"
        @edit="handleEdit(rule)"
        @delete="handleDelete(rule.ruleId)"
      />
    </div>

    <!-- 加载状态 -->
    <div v-if="attendanceStore.loading" class="text-center py-3 text-gray-500">
      <el-icon><Loading /></el-icon> 加载中...
    </div>
    <div
      v-if="!attendanceStore.hasMore && attendanceStore.ruleList.length"
      class="text-center py-3 text-gray-400"
    >
      没有更多数据了
    </div>
    <div
      v-if="!attendanceStore.ruleList.length && !attendanceStore.loading"
      class="text-center py-4 text-gray-500"
    >
      暂无考勤规则
    </div>
  </div>
  <!-- </div>  -->
  <AddRuleDialog v-if="isDialogVisible" @visible="isDialogVisible = $event" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAttendanceStore } from '@/stores/attendance'
import AttendanceRuleItem from '@/components/realAttendance/AttendanceRuleItem.vue'
import AddRuleDialog from '@/components/realAttendance/AddRuleDialog.vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'

// Pinia Store
const attendanceStore = useAttendanceStore()

// 响应式变量

const searchKeyword = ref('')
const statusFilter = ref('')
const isDialogVisible = ref(false)

// 筛选后的规则列表
const filteredRuleList = computed(() => {
  return attendanceStore.ruleList.filter((rule) => {
    const matchKeyword = rule.ruleName.includes(searchKeyword.value)
    const matchStatus = statusFilter.value ? rule.isEnabled.toString() === statusFilter.value : true
    return matchKeyword && matchStatus
  })
})

// 页面初始化
onMounted(() => {
  attendanceStore.fetchRuleList()
})

// 搜索
const handleSearch = () => {
  attendanceStore.resetList()
  attendanceStore.fetchRuleList()
}

// 新增规则
const handleAdd = () => {
  // 打开新增弹窗逻辑
  isDialogVisible.value = true
}

// 编辑规则
const handleEdit = (rule: any) => {
  // 打开编辑弹窗逻辑
  console.log('编辑规则:', rule)
}

// 删除规则
const handleDelete = async (ruleId: number) => {
  try {
    await ElMessageBox.confirm('确定删除该规则吗？', '提示', { type: 'warning' })
    // 调用删除接口
    // await axios.delete(`/api/attendance/rules/${ruleId}`);
    ElMessage.success('删除成功')
    attendanceStore.resetList()
    attendanceStore.fetchRuleList()
  } catch (err) {
    ElMessage.info('已取消删除')
  }
}
</script>
