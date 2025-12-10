<template>
  <div
    ref="cardRef"
    class="employee-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
  >
    <!-- 卡片头部（可后续添加图片） -->
    <div class="card-header mb-3 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-800">{{ employee.name }}</h3>
      <el-tag :type="getStatusTagType(employee.status)">{{ employee.status }}</el-tag>
    </div>

    <!-- 卡片内容（员工信息） -->
    <div class="card-content space-y-2 text-gray-600">
      <div class="flex items-center">
        <el-icon class="mr-2 text-gray-400"><Department /></el-icon>
        <span>部门：{{ employee.department }}</span>
      </div>
      <div class="flex items-center">
        <el-icon class="mr-2 text-gray-400"><Position /></el-icon>
        <span>职位：{{ employee.position }}</span>
      </div>
      <div class="flex items-center">
        <el-icon class="mr-2 text-gray-400"><Phone /></el-icon>
        <span>电话：{{ employee.phone }}</span>
      </div>
      <div class="flex items-center">
        <el-icon class="mr-2 text-gray-400"><Mail /></el-icon>
        <span>邮箱：{{ employee.email }}</span>
      </div>
      <div class="flex items-center">
        <el-icon class="mr-2 text-gray-400"><Calendar /></el-icon>
        <span>入职日期：{{ employee.hireDate }}</span>
      </div>
    </div>

    <!-- 卡片底部（可后续添加操作按钮，如编辑、删除等） -->
    <div class="card-footer mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-2">
      <el-button size="small" type="text" class="text-blue-500">详情</el-button>
      <el-button size="small" type="text" class="text-gray-500">编辑</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, onMounted } from 'vue'
import type { Employee } from '@/mock/user'
// import { Department, Position, Phone, Mail, Calendar } from '@element-plus/icons-vue';
// import { ElTag, ElButton, ElIcon } from 'element-plus'
const cardRef = ref<HTMLDivElement | null>(null)
// 接收父组件传递的员工数据
const props = defineProps<{
  employee: Employee
}>()
// 在EmployeeCard组件中
const getCardHeight = () => {
  if (cardRef.value) {
    // 获取卡片实际高度（包含内边距、边框，不包含外边距）
    const height = cardRef.value.offsetHeight
    // 发送高度给父组件（携带索引，确保对应到正确的卡片）
    console.log('子组件：', height)
  }
}

// 挂载时获取初始高度
onMounted(getCardHeight)
// 根据员工状态设置标签类型
const getStatusTagType = (status: string) => {
  switch (status) {
    case '在职':
      return 'success' as const // as const 确保类型精准，适配 el-tag 的 type 类型
    case '离职':
      return 'danger' as const
    case '休假':
      return 'warning' as const
    default:
      return 'info' as const
  }
}
</script>

<style scoped>
.employee-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;
}
</style>
