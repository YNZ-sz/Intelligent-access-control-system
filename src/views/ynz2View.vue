<template>
  <div class="sign-calendar-container bg-white rounded-xl shadow-sm p-6">
    <p class="text-gray-500 mb-4">2025 年运行了 1 个任务喵 ~(∠ · ω< ) ⌒★</p>
    <el-calendar v-model="currentDate">
      <!-- 隐藏原生日期文本，自定义格子样式 -->
      <template #dateCell="{ date, data }">
        <div class="sign-grid" :class="getGridClass(data.day)" @click="handleSign(data.day)"></div>
      </template>
    </el-calendar>
    <!-- 颜色图例 -->
    <div class="flex items-center justify-center gap-2 mt-4">
      <span class="text-sm text-gray-500">Less</span>
      <div
        v-for="(color, index) in colorLevels"
        :key="index"
        class="w-3 h-3 rounded-full"
        :class="`bg-${color}-400`"
      ></div>
      <span class="text-sm text-gray-500">More</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 当前日期
const currentDate = ref(new Date())

// 模拟签到数据：格式为 { 日期: 颜色等级 }
const signData = ref<any>({
  '2025-11-22': 2, // 对应颜色等级
  '2025-02-15': 3,
  // 可根据实际业务扩展更多日期
})

// 颜色等级配置（从浅到深）
const colorLevels = ['gray', 'green', 'emerald', 'teal', 'rose']

// 根据日期获取格子样式类
const getGridClass = (day: number) => {
  const dateStr = `${currentDate.value.getFullYear()}-${String(currentDate.value.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const level = signData.value[dateStr] || 0
  return level > 0 ? `bg-${colorLevels[level]}-400` : 'bg-gray-100'
}

// 处理签到点击
const handleSign = (day: number) => {
  const dateStr = `${currentDate.value.getFullYear()}-${String(currentDate.value.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  // 模拟签到逻辑（实际可对接后端接口）
  const randomLevel = Math.floor(Math.random() * 5) + 1
  signData.value[dateStr] = randomLevel
  ElMessage.success('签到成功！')
}
</script>

<style scoped>
/* 容器样式重置 */
:deep(.el-calendar) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.el-calendar__header) {
  display: none; /* 隐藏原生头部 */
}

:deep(.el-calendar-table) {
  width: 100% !important;
}

:deep(.el-calendar-table th, .el-calendar-table td) {
  padding: 0 !important;
  text-align: center;
}

:deep(.el-calendar-table td) {
  height: 32px !important;
}

/* 自定义格子样式 */
.sign-grid {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.sign-grid:hover {
  transform: scale(1.1);
}

/* 月份标签样式 */
:deep(.el-calendar-table thead th) {
  font-size: 12px;
  color: #606266;
  padding: 8px 0 !important;
}
</style>
